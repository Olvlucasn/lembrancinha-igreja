"""
Gera QR codes para cada pessoa da planilha.
Instale as dependências: pip install qrcode[pil] pillow
"""

import qrcode
import os
import csv

# ==============================================================
# CONFIGURE AQUI
# ==============================================================
URL_BASE = "https://SEU-USUARIO.github.io/lembrancinha-igreja/?id="
ARQUIVO_CSV = "pessoas.csv"      # planilha exportada como CSV
PASTA_SAIDA = "qrcodes"          # onde os QR codes serão salvos
# ==============================================================

os.makedirs(PASTA_SAIDA, exist_ok=True)

with open(ARQUIVO_CSV, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    pessoas = list(reader)

for pessoa in pessoas:
    id_pessoa = pessoa["id"].strip()
    nome = pessoa["nome"].strip()
    url = URL_BASE + id_pessoa

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#1a1a2e", back_color="white")
    arquivo = os.path.join(PASTA_SAIDA, f"{id_pessoa}.png")
    img.save(arquivo)
    print(f"✅ {nome} → {arquivo}")

print(f"\nPronto! {len(pessoas)} QR codes gerados na pasta '{PASTA_SAIDA}'.")
