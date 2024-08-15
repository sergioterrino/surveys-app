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

    # Paso 2: Obtener los datos desde la API de DRF headers = {'Authorization': f'Token {token}'}
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

    # Calcular la media de los resultados
    result_columns = [f'result{i}' for i in range(1, 11)]
    df['mean_result'] = df[result_columns].mean(axis=1)

    # Paso 4: Generar gráficos

    # Gráfico de barras
    sns.set_theme(style="whitegrid") # Configurar el estilo de los gráficos
    plt.figure(figsize=(10, 6)) # Configurar el tamaño de la figura
    sns.barplot(x='question', y='mean_result', data=df, ci=None) # Crear un gráfico de barras sin intervalo de confianza
    plt.title('Resultados de la Encuesta')
    plt.xlabel('Pregunta')
    plt.ylabel('Respuesta Media')
    plt.savefig(f'static/results_chart_{survey_id}.png')  # Guardar el gráfico en un archivo
    plt.close()  # Cerrar la figura para evitar superposiciones

    # Gráfico circular (pastel) para mostrar el porcentaje de mujeres y hombres
    gender_counts = df['gender'].value_counts()  # Suponiendo que hay una columna 'gender' en el DataFrame
    plt.figure(figsize=(8, 8))  # Configurar el tamaño de la figura
    plt.pie(gender_counts, labels=gender_counts.index, autopct='%1.1f%%', startangle=140)
    plt.title('Distribución de Género')
    plt.savefig(f'static/gender_distribution_{survey_id}.png')  # Guardar el gráfico en un archivo
    plt.close()  # Cerrar la figura para evitar superposiciones

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Procesar datos de encuestas y generar gráficos.') # Crear un objeto de tipo ArgumentParser para manejar los argumentos de la línea de comandos
    parser.add_argument('survey_id', type=int, help='ID de la encuesta') # Agregar un argumento para el ID de la encuesta
    args = parser.parse_args() # Obtener los argumentos de la línea de comandos
    main(args.survey_id) # Llamar a la función main con el ID de la encuesta como argumento