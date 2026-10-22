"""
Gera um QR code (PNG) para cada pessoa do pessoas.json.
Usa o reportlab (para montar o QR) e o Pillow (para desenhar a imagem).

Uso: python gerar_qrcodes.py            -> todas as pessoas
     python gerar_qrcodes.py catarina   -> só uma
"""

import json
import os
import sys

from PIL import Image, ImageDraw
from reportlab.graphics.barcode import qrencoder

# ==============================================================
# CONFIGURE AQUI
# ==============================================================
URL_BASE = "https://olvlucasn.github.io/lembrancinha-igreja/?id="
PASTA_SAIDA = "qrcodes"
COR = "#1d1b17"
TAMANHO_MODULO = 20   # px de cada quadradinho
BORDA = 4             # quadradinhos de margem branca
# ==============================================================


def gerar(id_pessoa):
    qr = qrencoder.QRCode(None, qrencoder.QRErrorCorrectLevel.H)
    qr.addData(URL_BASE + id_pessoa)
    qr.make()

    n = qr.getModuleCount()
    lado = (n + 2 * BORDA) * TAMANHO_MODULO
    img = Image.new("RGB", (lado, lado), "white")
    desenho = ImageDraw.Draw(img)
    for linha in range(n):
        for coluna in range(n):
            if qr.isDark(linha, coluna):
                x = (coluna + BORDA) * TAMANHO_MODULO
                y = (linha + BORDA) * TAMANHO_MODULO
                desenho.rectangle([x, y, x + TAMANHO_MODULO - 1, y + TAMANHO_MODULO - 1], fill=COR)

    arquivo = os.path.join(PASTA_SAIDA, f"{id_pessoa}.png")
    img.save(arquivo)
    return arquivo


if __name__ == "__main__":
    os.makedirs(PASTA_SAIDA, exist_ok=True)
    with open("pessoas.json", encoding="utf-8") as f:
        pessoas = json.load(f)

    filtro = sys.argv[1:] or [p["id"] for p in pessoas]
    for p in pessoas:
        if p["id"] in filtro:
            print(f"OK {p['nome']:<10} -> {gerar(p['id'])}")
