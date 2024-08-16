import requests
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import argparse

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
        login_response.raise_for_status() # Lanzar una excepción si la respuesta tiene un error
        token = login_response.json().get('token')
        print(f'Token obtenido: {token}')
    except requests.exceptions.RequestException as e: # Capturar cualquier excepción de requests
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
        df = pd.DataFrame(data) # Convertir los datos a un DataFrame de Pandas
        print('df -> ', df) # Imprime todo el DataFrame
        print('df.head() -> ', df.head()) # Print solo las 5 primeras rows del df
        print('df.columns-> ', df.columns)  # Imprimir los nombres de las columnas
    else:
        print('No se pudieron obtener los datos.')
        return

    # Paso 4: Generar gráficos
    sns.set_theme(style="whitegrid") # Configurar el estilo de los gráficos
    plt.figure(figsize=(10, 6)) # Configurar el tamaño de la figura en pulgadas
    # Suponiendo que quieres graficar las respuestas de result1 a result10
    result_columns = [f'question{i}' for i in range(1, 11)] # Crear una lista con los nombres de las columnas
    df_melted = df.melt(id_vars=['id', 'survey', 'user', 'created_at'], value_vars=result_columns, 
                        var_name='question', value_name='answer') # Convertir las columnas en filas

    sns.barplot(x='question', y='answer', data=df_melted) # Crear un gráfico de barras
    plt.title('Puntuación media de los resultados por pregunta') # Configurar el título del gráfico
    plt.xlabel('Pregunta')
    plt.ylabel('Puntuación')
    plt.savefig(f'static/results_chart_{survey_id}.png')  # Guardar el gráfico en un archivo

if __name__ == "__main__":
    import sys
    survey_id = sys.argv[1] if len(sys.argv) > 1 else 1
    main(survey_id)