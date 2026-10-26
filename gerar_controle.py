"""
Gera a planilha de controle das lembrancinhas (controle.xlsx).

Junta a lista de todas as pessoas (pastas do Drive) com o que já está
no site (pessoas.json) e mostra quem está concluído e quem está pendente,
com o link da página e o link do QR code.

Rode sempre que atualizar alguém:  python gerar_controle.py
"""

import json
import os
import unicodedata
from datetime import date

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

# ==============================================================
# CONFIGURE AQUI
# ==============================================================
SITE = "https://olvlucasn.github.io/lembrancinha-igreja/"
PASTA_DRIVE = r"C:\Users\lucasn\Downloads\Concluidos Impacto somente imagens"
# Pessoas que ainda não estão na pasta do Drive (nome completo, observação)
EXTRAS = []
ARQUIVO = "controle.xlsx"
# ==============================================================

FONTE = "Arial"
COR_TITULO = "2A2219"
COR_CONCLUIDO = "E3F1DF"
COR_PENDENTE = "FBEBDD"


def sem_acento(texto):
    return "".join(c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn")


def id_da_pasta(nome_pasta):
    return sem_acento(nome_pasta.split()[0]).lower()


def lista_de_pessoas():
    # O download do Drive às vezes vem com sufixo no nome ("NOME-20261022T...-1-001")
    pessoas = [(p.split("-")[0].strip(), "") for p in sorted(os.listdir(PASTA_DRIVE)) if os.path.isdir(os.path.join(PASTA_DRIVE, p))]
    return pessoas + EXTRAS


def main():
    with open("pessoas.json", encoding="utf-8") as f:
        no_site = {p["id"]: p for p in json.load(f)}

    wb = Workbook()
    ws = wb.active
    ws.title = "Controle"

    cabecalho = ["Nome", "Nome completo", "Status", "Capa", "Fotos", "Versículos", "Áudios",
                 "Link da página", "Link do QR code", "Observação"]
    larguras = [14, 34, 13, 8, 8, 11, 9, 58, 62, 52]

    ws["A1"] = "Lembrancinhas Impacto Radical 2026 - controle"
    ws["A1"].font = Font(name=FONTE, size=14, bold=True, color=COR_TITULO)
    ws["A2"] = "Atualizada em " + date.today().strftime("%d/%m/%Y") + " pelo script gerar_controle.py. Status = Concluído quando tem capa, versículo em todas as fotos e pelo menos 1 áudio."
    ws["A2"].font = Font(name=FONTE, size=9, italic=True, color="7A6C52")

    # Resumo (fórmulas)
    ws["A4"], ws["A5"] = "Concluídos", "Pendentes"
    for linha in (4, 5):
        ws[f"A{linha}"].font = Font(name=FONTE, bold=True)
        ws[f"B{linha}"].font = Font(name=FONTE, bold=True)
        ws[f"B{linha}"].alignment = Alignment(horizontal="left")

    linha_cab = 7
    borda = Border(bottom=Side(style="thin", color="CFC7B2"))
    for col, (titulo, largura) in enumerate(zip(cabecalho, larguras), start=1):
        c = ws.cell(row=linha_cab, column=col, value=titulo)
        c.font = Font(name=FONTE, bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor=COR_TITULO)
        c.alignment = Alignment(horizontal="center", vertical="center")
        ws.column_dimensions[c.column_letter].width = largura
    ws.row_dimensions[linha_cab].height = 22

    linha = linha_cab + 1
    contagem = {"Concluído": 0, "Pendente": 0}
    for nome_completo, obs in lista_de_pessoas():
        id_pessoa = id_da_pasta(nome_completo)
        p = no_site.get(id_pessoa)
        fotos = p["fotos"] if p else []
        tem_capa = "Sim" if p and p.get("capa") else "Não"
        n_versiculos = sum(1 for f in fotos if isinstance(f, dict) and f.get("versiculo"))
        n_audios = len(p.get("audios") or ([p["audio"]] if p.get("audio") else [])) if p else 0

        valores = [
            nome_completo.split()[0].capitalize(),
            nome_completo.title(),
            # Status já calculado (texto puro, para copiar e colar em outra planilha sem quebrar)
            "Concluído" if tem_capa == "Sim" and fotos and n_versiculos == len(fotos) and n_audios > 0 else "Pendente",
            tem_capa, len(fotos), n_versiculos, n_audios,
            SITE + "?id=" + id_pessoa if p else "",
            SITE + "qrcodes/" + id_pessoa + ".png" if p and os.path.exists(f"qrcodes/{id_pessoa}.png") else "",
            obs or ("" if p else "Ainda não está no site"),
        ]
        for col, v in enumerate(valores, start=1):
            c = ws.cell(row=linha, column=col, value=v)
            c.font = Font(name=FONTE)
            c.border = borda
            c.alignment = Alignment(vertical="center", horizontal="center" if 3 <= col <= 7 else "left")
            if col in (8, 9) and v:
                c.hyperlink = v
                c.font = Font(name=FONTE, color="1F5FA8", underline="single")
        contagem[valores[2]] += 1
        linha += 1

    ws["B4"], ws["B5"] = contagem["Concluído"], contagem["Pendente"]
    ultima = linha - 1
    faixa = f"A{linha_cab + 1}:J{ultima}"
    ws.conditional_formatting.add(faixa, FormulaRule(formula=[f'$C{linha_cab + 1}="Concluído"'], fill=PatternFill("solid", fgColor=COR_CONCLUIDO)))
    ws.conditional_formatting.add(faixa, FormulaRule(formula=[f'$C{linha_cab + 1}="Pendente"'], fill=PatternFill("solid", fgColor=COR_PENDENTE)))
    ws.freeze_panes = f"A{linha_cab + 1}"
    ws.auto_filter.ref = f"A{linha_cab}:J{ultima}"

    wb.save(ARQUIVO)
    print(f"OK {ARQUIVO}: {ultima - linha_cab} pessoas")


if __name__ == "__main__":
    main()
