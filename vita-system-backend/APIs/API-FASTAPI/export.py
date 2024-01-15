import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interact, widgets
import seaborn as sns
import math
from PyPDF2 import PdfFileReader


# Função para calcular a Pressão Resistiva das Vias Aéreas (Praw)
def calculate_praw(fluxo, raw):
    return fluxo * raw

# Função para calcular a Pressão Elástica do Sistema Respiratório (Pplato)
def calculate_pplato(vc, crs):
    return vc / crs

# Função para calcular a Pressão Inspiratória de Pico (PIP)
def calculate_pip(praw, pplato):
    return praw + pplato

# Função para calcular o tempo inspiratório (Ti)
def calculate_ti(vc, fluxo):
    return vc / fluxo


# Parâmetros e valores de exemplo
fluxo = 0.5  # L/seg
raw = 10  # cmH2O/L/seg
vc = 750  # ml
crs = 50  # mL/cmH2O

# Calculando os valores
praw_value = calculate_praw(fluxo, raw)
pplato_value = calculate_pplato(vc, crs)
pip_value = calculate_pip(praw_value, pplato_value)
# Imprimindo os resultados
print(f"Praw: {praw_value} cmH2O")
print(f"Pplato: {pplato_value} mL/cmH2O")
print(f"PIP: {pip_value} cmH2O")


def chart_2():
    # Parâmetros e valores de exemplo
    vc = 600  # ml
    frequencia_respiratoria = 12  # respirações por minuto
    fluxo_1 = 60  # L/min
    fluxo_2 = 30  # L/min

    # Convertendo fluxo para ml/seg
    fluxo_1_ml_seg = fluxo_1 / 60
    fluxo_2_ml_seg = fluxo_2 / 60

    # Calculando os tempos inspiratórios (Ti)
    ti_1 = calculate_ti(vc, fluxo_1_ml_seg)
    ti_2 = calculate_ti(vc, fluxo_2_ml_seg)

    # Criando um gráfico de barras para representar os efeitos do fluxo na I:E
    labels = ['Fluxo 1', 'Fluxo 2']
    tempos_inspiratorios = [ti_1, ti_2]
    tempos_expiratorios = [60 / frequencia_respiratoria - ti_1, 60 / frequencia_respiratoria - ti_2]

    bar_width = 0.35
    index = np.arange(len(labels))

    fig, ax = plt.subplots()
    bar1 = ax.bar(index, tempos_inspiratorios, bar_width, label='Tempo Inspiratório')
    bar2 = ax.bar(index + bar_width, tempos_expiratorios, bar_width, label='Tempo Expiratório')

    ax.set_xlabel('Fluxo Inspiratório')
    ax.set_ylabel('Tempo (segundos)')
    ax.set_title('Efeitos do Fluxo Inspiratório na I:E')
    ax.set_xticks(index + bar_width / 2)
    ax.set_xticklabels(labels)
    ax.legend()
    return 

def chart_3():
    # Gerando dados de exemplo para representar os parâmetros
    tempo = np.linspace(0, 5, 100)
    volume = 500 * np.sin(tempo) + 1000
    fluxo = 100 * np.cos(tempo)
    pressao = 5 * tempo + 20

    # Criando subplots para representar os gráficos
    fig, axs = plt.subplots(3, 1, figsize=(10, 8), sharex=True)

    # Gráfico de VOLUME em função do TEMPO
    axs[0].plot(tempo, volume, label='Volume')
    axs[0].set_ylabel('Volume (ml)')
    axs[0].legend()

    # Gráfico de FLUXO em função do TEMPO
    axs[1].plot(tempo, fluxo, label='Fluxo')
    axs[1].set_ylabel('Fluxo (ml/seg)')
    axs[1].legend()

    # Gráfico de PRESSÃO em função do TEMPO
    axs[2].plot(tempo, pressao, label='Pressão')
    axs[2].set_xlabel('Tempo (segundos)')
    axs[2].set_ylabel('Pressão (cmH2O)')
    axs[2].legend()

    # Criando o "loop" VOLUME - PRESSÃO com curva de histerese
    plt.figure(figsize=(8, 6))
    plt.plot(volume, pressao, label='Loop VOLUME - PRESSÃO', color='blue')
    plt.title('Loop VOLUME - PRESSÃO com Curva de Histerese')
    plt.xlabel('Volume (ml)')
    plt.ylabel('Pressão (cmH2O)')
    # Adicionando a curva de histerese
    plt.fill_between(volume, pressao, color='blue', alpha=0.2, label='Histerese')
    plt.legend()
    return 

def simulate_respiratory_abnormality(abnormality, duration=30):
    # Simulando dados de volume, fluxo e pressão com base na anormalidade respiratória
    time = np.arange(0, duration, 0.1)
    volume, fluxo, pressao = np.zeros_like(time), np.zeros_like(time), np.zeros_like(time)

    if abnormality == 'eupneia':
        volume = 500 * np.sin(2 * np.pi * time / 10) + 1000
    elif abnormality == 'bradipneia':
        volume = 300 * np.sin(2 * np.pi * time / 15) + 1000
    elif abnormality == 'apneia':
        pass  # Volume, fluxo e pressão são mantidos em zero
    elif abnormality == 'taquipneia':
        volume = 800 * np.sin(2 * np.pi * time / 5) + 1000
    elif abnormality == 'hiperpneia':
        volume = 500 * np.sin(2 * np.pi * time / 5) + 1500
    elif abnormality == 'cheines-stokes':
        volume = 500 * np.sin(2 * np.pi * time / 10) + 1000
        fluxo = 100 * np.cos(2 * np.pi * time / 10)
    elif abnormality == 'biot':
        volume = 500 * np.sin(2 * np.pi * time / 5) + 1000
        fluxo = 150 * np.cos(2 * np.pi * time / 5)
        pressao = 10 * time / duration

    return time, volume, fluxo, pressao

def plot_respiratory_abnormality(abnormality):
    time, volume, fluxo, pressao = simulate_respiratory_abnormality(abnormality)

    fig, axs = plt.subplots(3, 1, figsize=(10, 8), sharex=True)

    axs[0].plot(time, volume, label='Volume')
    axs[0].set_ylabel('Volume (ml)')
    axs[0].legend()

    axs[1].plot(time, fluxo, label='Fluxo')
    axs[1].set_ylabel('Fluxo (ml/seg)')
    axs[1].legend()

    axs[2].plot(time, pressao, label='Pressão')
    axs[2].set_xlabel('Tempo (segundos)')
    axs[2].set_ylabel('Pressão (cmH2O)')
    axs[2].legend()

    plt.suptitle(f'Simulação de {abnormality.capitalize()}')
    plt.show()

def chart_1():
    # Criando um gráfico simples
    time_points = np.linspace(0, 1, 100)
    pressure_curve = np.zeros_like(time_points)

    # Simulando a alteração na curva PRESSÃO/TEMPO com base nas mudanças em Raw e Crs
    # (Este é um exemplo simples, os valores reais podem variar)
    for i, t in enumerate(time_points):
        pressure_curve[i] = calculate_pip(calculate_praw(fluxo, raw * (1 + t)), calculate_pplato(vc, crs * (1 - t)))

    # Plotando a curva PRESSÃO/TEMPO
    plt.plot(time_points, pressure_curve)
    plt.title('Curva PRESSÃO/TEMPO')
    plt.xlabel('Tempo')
    plt.ylabel('Pressão')
    return plt.base64


def extract_information(pdf_path, image_1):
    with open(pdf_path, 'rb') as f:
        pdf = PdfFileReader(f)
        information = pdf.getDocumentInfo()
        number_of_pages = pdf.getNumPages()

    txt = f"""
    Information about {pdf_path}: 

    Author: {information.author}
    Creator: {information.creator}
    Producer: {information.producer}
    Subject: {information.subject}
    Title: {information.title}
    Number of pages: {number_of_pages}
    """

    print(txt)
    return information

def main():
    chart_1 = chart_1()
    chart_2 = chart_2()
    chart_3 = chart_3()
    path = './reportlab-sample.pdf'
    extract_information(path, chart_1)
    return path
