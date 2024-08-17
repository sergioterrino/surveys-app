import requests
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import argparse
import numpy as np


def main(survey_id):
    # Configuración
    login_url = 'http://127.0.0.1:8000/api/login/'
    get_answers_url = f'http://127.0.0.1:8000/api/surveys/{survey_id}/results/overall/'

    # Credenciales de inicio de sesión
    login_data = {
        'email': 'lbd@gmail.com',
        'password': '11111111'
    }

    # 1: Obtener el token de autenticación
    try:
        login_response = requests.post(login_url, data=login_data)
        # Lanzar una excepción si la respuesta tiene un error
        login_response.raise_for_status()
        token = login_response.json().get('token')
        print(f'Token obtenido: {token}')
    except requests.exceptions.RequestException as e:  # Capturar cualquier excepción de requests
        print(f'Error al obtener el token: {e}')
        return

    # Paso 2: Obtener los datos desde la API de DRF
    headers = {'Authorization': f'Token {token}'}
    try:
        response = requests.get(get_answers_url, headers=headers)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error al obtener los datos: {e}')
        return

    # Paso 3: Procesar los datos
    if data:
        df = pd.DataFrame(data)  # Convertir los datos a un DataFrame de Pandas
        df_main = df.drop(columns=['question11', 'question12', 'question13'])
        df_sex = df['question11']
        df_age = df['question12'].dropna() # elimina valores None
        df_religion = df['question13']
        print('df_main -> ', df_main)  # Imprime todo el DataFrame
        # Print solo las 5 primeras rows del df_main
        print('df_main.head() -> ', df_main.head())
        # Imprimir los nombres de las columnas
        print('df_main.columns-> ', df_main.columns)
    else:
        print('No se pudieron obtener los datos.')
        return

    # Paso 4: Generar gráficos
    
    # # Gráfico MAIN -> (q1-q10) --------------
    # sns.set_theme(style="whitegrid")  # Configurar el estilo de los gráficos
    # # Configurar el tamaño de la figura en pulgadas
    # plt.figure(figsize=(10, 6))
    # # Suponiendo que quieres graficar las respuestas de result1 a result10
    # # Crear una lista con los nombres de las columnas
    # result_columns = [f'question{i}' for i in range(1, 11)]
    # df_melted = df_main.melt(id_vars=['id', 'survey', 'user', 'created_at'], value_vars=result_columns, var_name='question', value_name='answer')  # Convertir las columnas en filas

    # # Crear un gráfico de barras
    # sns.barplot(x='question', y='answer', data=df_melted, )
    # # Configurar el título del gráfico
    # titleColor = '#ffffff'
    # plt.title('Puntuación media de los resultados por pregunta')
    # plt.xlabel('Pregunta')
    # plt.ylabel('Puntuación')
    # # Guardar el gráfico en un archivo
    # plt.savefig(f'static/results_plot_{survey_id}.png')
    # plt.close()

    # ---- Gráfico MAIN -> (q1-q10) -----------------------------------------------
    sns.set_theme(style="whitegrid")  # Configurar el estilo de los gráficos
    # Configurar el tamaño de la figura en pulgadas
    plt.figure(figsize=(10, 6), facecolor='#202020')
    # Suponiendo que quieres graficar las respuestas de result1 a result10
    # Crear una lista con los nombres de las columnas
    result_columns = [f'question{i}' for i in range(1, 11)]
    df_melted = df_main.melt(id_vars=['id', 'survey', 'user', 'created_at'], value_vars=result_columns, var_name='question', value_name='answer')  # Convertir las columnas en filas

    # Crear un gráfico de barras
    sns.barplot(x='question', y='answer', data=df_melted, hue='question', palette=['#0384fc'] * len(result_columns), legend=False)
    # Configurar el título del gráfico
    titleColor = '#ffffff'
    plt.title('Puntuación media de los resultados por pregunta', color=titleColor, fontweight='bold', pad=10)
    plt.ylabel('Puntuación', color='white')
    plt.xticks(color='white')
    plt.yticks(color='white')
    plt.grid(False)
    # Cambiar el fondo del área de las barras a oscuro
    ax = plt.gca() # getCurrentAxis
    ax.set_facecolor('#202020')
    # Guardar el gráfico en un archivo
    plt.savefig(f'static/results_plot_{survey_id}.png')
    plt.close()
    #############################################################################

    # ----- Gráfico SEX (q11) ----------------------------------------------------
    if 'question11' in df.columns and not df['question11'].dropna().empty:
        sex_counts = df_sex.value_counts()  # cuanta la cantidad de men/women
        plt.figure(figsize=(4, 3), facecolor='#202020')
        colors = ['#0d8c22','#6a0cad']
        plt.pie(sex_counts, labels=sex_counts.index,
                autopct='%1.1f%%', startangle=140, colors=colors, textprops={'color': 'white'})  # pie = pastel,
        plt.title('Porcentaje de hombres vs mujeres', color=titleColor, fontweight='bold', pad=10)
        plt.axis('equal')  # asegura que el plot sea circular
        plt.savefig(f'static/results_plot_sex_{survey_id}.png')
        plt.close()
    else:
        print("No hay datos de sexo disponibles para graficar.")
    ###########################################################################
    
    # ----- Gráfico RELIGION (q13) --------------------------------------------
    if 'question13' in df.columns and not df['question13'].dropna().empty:
        religion_counts = df_religion.value_counts() 
        plt.figure(figsize=(4, 3), facecolor='#202020')
        religion_colors = {
            'christian': '#b00000',
            'muslim': '#2dad02',
            'hindu': '#ad5a02',
            'jewish': '#66b3ff',
            'buddhist': '#a6a002',
            'other': '#802fba',
            'unbeliever': '#696966'
        }
        colors = [religion_colors[religion] for religion in religion_counts.index]
        plt.pie(religion_counts, labels=religion_counts.index,
                autopct='%1.1f%%', startangle=140, colors=colors, textprops={'color': 'white'})  # pie = pastel,
        plt.title('Porcentaje de religiones', color=titleColor, fontweight='bold', pad=10)
        plt.axis('equal')  # asegura que el plot sea circular
        plt.savefig(f'static/results_plot_religion_{survey_id}.png')
        plt.close()
    else:
        print("No hay datos de Religion disponibles para graficar.")
    ##########################################################################
    
    # ----- Gráfico AGE (q12) -------------------------------------------------
    if 'question12' in df.columns and not df['question12'].dropna().empty:
        age_counts = df_age.value_counts()  # cuenta la cantidad de respuestas por edad
        plt.figure(figsize=(10, 6), facecolor='#202020')
        plt.hist(df_age, bins=range(min(df_age), max(df_age) + 1), edgecolor='white', color='#1f77b4')  # Crear un histograma con bordes blancos y barras azules
        plt.title('Distribución de edades de los usuarios', color='white', fontweight='bold', pad=20)  # Título en negrita con espacio abajo
        plt.xlabel('Edad', color='white')  # Cambiar el color de la etiqueta del eje x a blanco
        plt.ylabel('Cantidad de usuarios', color='white')  # Cambiar el color de la etiqueta del eje y a blanco
        plt.xticks(color='white')  # Cambiar el color de los números del eje x a blanco
        plt.yticks(np.arange(0, max(age_counts) + 1, 1), color='white')  # Cambiar el color de los números del eje y a blanco
        plt.grid(False)  # Añadir una cuadrícula con color blanco

        # Cambiar el fondo del área de las barras a oscuro
        ax = plt.gca()
        ax.set_facecolor('#202020')

        plt.savefig(f'static/results_plot_age_{survey_id}.png', facecolor='#202020')  # Guardar el gráfico con el fondo oscuro
        plt.close()
    else:
        print("No hay datos de edad disponibles para graficar.")
    ############################################################################

if __name__ == "__main__":
    import sys
    survey_id = sys.argv[1] if len(sys.argv) > 1 else 1
    main(survey_id)
