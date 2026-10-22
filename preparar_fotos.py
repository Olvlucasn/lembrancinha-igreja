"""
Prepara as fotos das pessoas para o site.

Lê a pasta baixada do Drive (uma subpasta por pessoa), corrige a rotação,
reduz o tamanho e salva em fotos/<id>/01.jpg, 02.jpg...
No final gera o pessoas.json que o site usa.

Uso: python preparar_fotos.py "C:/caminho/da/pasta/do/drive"
"""

import json
import os
import sys
import unicodedata

from PIL import Image, ImageOps

LADO_MAXIMO = 1400      # px do lado maior
QUALIDADE = 80          # qualidade do JPG
PASTA_FOTOS = "fotos"
ARQUIVO_JSON = "pessoas.json"
EXTENSOES = (".jpg", ".jpeg", ".png", ".webp")

# Fotos descartadas por baixa qualidade (nome do arquivo original)
DESCARTAR = set()
if os.path.exists("descartadas.txt"):
    with open("descartadas.txt", encoding="utf-8") as f:
        DESCARTAR = {linha.strip() for linha in f if linha.strip()}


def sem_acento(texto):
    return "".join(c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn")


def primeiro_nome(pasta):
    return pasta.split()[0].capitalize()


def data_da_foto(caminho):
    """Usa a data do EXIF quando existe; senão a data do arquivo."""
    try:
        exif = Image.open(caminho).getexif()
        data = exif.get(36867) or exif.get(306)
        if data:
            return str(data)
    except Exception:
        pass
    return os.path.basename(caminho)


def main(origem):
    # Mantém o áudio/mensagem já cadastrados se o json existir
    anteriores = {}
    if os.path.exists(ARQUIVO_JSON):
        with open(ARQUIVO_JSON, encoding="utf-8") as f:
            anteriores = {p["id"]: p for p in json.load(f)}

    pessoas = []
    for pasta in sorted(os.listdir(origem)):
        caminho_pasta = os.path.join(origem, pasta)
        if not os.path.isdir(caminho_pasta):
            continue

        nome = primeiro_nome(pasta)
        id_pessoa = sem_acento(nome).lower()
        destino = os.path.join(PASTA_FOTOS, id_pessoa)
        os.makedirs(destino, exist_ok=True)
        for antigo in os.listdir(destino):
            os.remove(os.path.join(destino, antigo))

        arquivos = [
            os.path.join(caminho_pasta, a)
            for a in os.listdir(caminho_pasta)
            if a.lower().endswith(EXTENSOES) and a not in DESCARTAR
        ]
        arquivos.sort(key=data_da_foto)

        fotos = []
        for n, arquivo in enumerate(arquivos, start=1):
            img = ImageOps.exif_transpose(Image.open(arquivo)).convert("RGB")
            img.thumbnail((LADO_MAXIMO, LADO_MAXIMO))
            nome_saida = f"{n:02d}.jpg"
            img.save(os.path.join(destino, nome_saida), "JPEG", quality=QUALIDADE, optimize=True, progressive=True)
            fotos.append(f"{PASTA_FOTOS}/{id_pessoa}/{nome_saida}")

        anterior = anteriores.get(id_pessoa, {})
        pessoas.append({
            "id": id_pessoa,
            "nome": nome,
            "fotos": fotos,
            "audio": anterior.get("audio", ""),
            "mensagem": anterior.get("mensagem", ""),
        })
        print(f"OK {nome:<10} {len(fotos):>2} fotos -> {destino}")

    with open(ARQUIVO_JSON, "w", encoding="utf-8") as f:
        json.dump(pessoas, f, ensure_ascii=False, indent=2)
    print(f"\n{len(pessoas)} pessoas salvas em {ARQUIVO_JSON}")


if __name__ == "__main__":
    main(sys.argv[1])
