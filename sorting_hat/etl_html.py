import requests
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import plotly.express as px


def main(survey_id):

    get_answers_url = f'http://127.0.0.1:8000/api/surveys/{survey_id}/results/overall/'

    # Paso 1: Obtener los datos desde la API de DRF
    try:
        response = requests.get(get_answers_url)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error al obtener los datos: {e}')
        return

    # Paso 2: Procesar los datos
    if data:
        df = pd.DataFrame(data)  # Convertir los datos a un DataFrame de Pandas
        # para el df_main solo quiero las q10s preguntas, así que borro las otras
        df_main = df.drop(
            columns=['id', 'user', 'survey', 'question11', 'question12', 'question13'])
        df_sex = df['question11'].dropna()  # elimina valores None
        df_age = df['question12'].dropna()
        df_religion = df['question13'].dropna()
        # Ajustar las opciones de visualización de pandas
        pd.set_option('display.max_rows', None)  # Mostrar todas las filas
        pd.set_option('display.max_columns', None)

        print('', df_main)  # Imprime todo el DataFrame
        # Print solo las 5 primeras rows del df_main
        print('df_main.head() -> ', df_main.head())
        # Imprimir los nombres de las columnas
        print('df_main.columns-> ', df_main.columns)
    else:
        print('No se pudieron obtener los datos. No data of response.')
        return

    # Paso 3: Generar gráficos

    # ---- Gráfico MAIN -> --------------------------------------------------------
    result_columns = [f'question{i}' for i in range(1, 11)]
    # Asegura que las columnas de las preguntas sean numéricas
    df_main[result_columns] = df_main[result_columns].apply(
        pd.to_numeric, errors='coerce')

    # Calcular la media de las respuestas para cada pregunta, ignorando valores NaN
    df_mean = df_main[result_columns].mean()

    # Convertir el resultado de la media en un DataFrame para usarlo con plotly
    df_mean_plot = pd.DataFrame({
        'question': df_mean.index,
        'mean_score': df_mean.values
    })

    # Renombrar las preguntas para que aparezcan como Q1, Q2, etc.
    df_mean_plot['question'] = df_mean_plot['question'].apply(
        lambda x: x.replace('question', 'Q'))

    # Crear el gráfico de barras interactivo
    fig = px.bar(
        df_mean_plot,
        x='question',
        y='mean_score',
        title='Mean Score by Question',
        labels={'question': 'Question', 'mean_score': 'Mean Score'},
        color='question',  # color distinto para cada barra
        color_discrete_sequence=px.colors.qualitative.Bold,  # Elegir una paleta de colores
    )

    fig.update_layout(
        template='plotly_dark',  # Tema oscuro
        xaxis_title='Question',
        yaxis_title='Mean Score',
        showlegend=False,
        plot_bgcolor='rgba(0,0,0,0)',  # Fondo del gráfico transparente
        paper_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, t=70, b=0),
        title={'x': 0.5, 'y': 0.95}
    )
    fig.write_html(f'static/plots/results_plot_{survey_id}.html')

    #############################################################################


    # ----- Gráfico SEX (q11) ----------------------------------------------------
    if 'question11' in df.columns and not df['question11'].dropna().empty:
        sex_counts = df_sex.value_counts()  # cuanta la cantidad de men/women
        df_sex_plot = pd.DataFrame({
            'sex': sex_counts.index,
            'count': sex_counts.values
        })
        fig_sex = px.pie(df_sex_plot, names='sex', values='count',
                         title='Percent of men vs women', hole=0.5,
                         color_discrete_sequence=['#0d8c22', '#6a0cad'])

        fig_sex.update_layout(
            template='plotly_dark',
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, t=30, b=0),
            legend=dict(
                orientation='h',
                xanchor='center',
                x=0.5,
            ),
            title={'x': 0.5},
        )
        fig_sex.write_html(f'static/plots/results_plot_sex_{survey_id}.html')
    else:
        print("No hay datos de sexo disponibles para graficar.")
    ###########################################################################


    # ----- Gráfico RELIGION (q13) --------------------------------------------
    if 'question13' in df.columns and not df['question13'].dropna().empty:
        religion_counts = df_religion.value_counts()
        df_religion_plot = pd.DataFrame({
            'religion': religion_counts.index,
            'count': religion_counts.values
        })

        religion_colors = {
            'christian': '#b00000',
            'muslim': '#2dad02',
            'hindu': '#ad5a02',
            'jewish': '#66b3ff',
            'buddhist': '#a6a002',
            'other': '#802fba',
            'unbeliever': '#696966'
        }
        colors = [religion_colors[religion]
                  for religion in religion_counts.index]

        fig_rel = px.pie(df_religion_plot, names='religion', values='count', title='Percent of religion',
                         color_discrete_sequence=colors)

        fig_rel.update_layout(
            template='plotly_dark',
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, t=30, b=0),
            legend=dict(
                orientation='h',
                xanchor='center',
                x=0.5
            ),
            title={'x': 0.5}
        )
        fig_rel.write_html(
            f'static/plots/results_plot_religion_{survey_id}.html')
    else:
        print("No hay datos de Religion disponibles para graficar.")
    ##########################################################################

    # ----- Gráfico AGE (q12) -------------------------------------------------
    if 'question12' in df.columns and not df['question12'].dropna().empty:
        age_counts = df_age.value_counts()  # cuenta la cantidad de respuestas por edad
        df_age_plot = pd.DataFrame({
            'age': age_counts.index,
            'count': age_counts.values
        })

        fig_age = px.histogram(
            df_age_plot, x='age', y='count', title='Age of the respondents', nbins=10, )

        fig_age.update_layout(
            template='plotly_dark',
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, t=70, r=0, b=0),
            title={'x': 0.5, 'y': 0.90}
        )
        fig_age.write_html(f'static/plots/results_plot_age_{survey_id}.html')
    else:
        print("No hay datos de edad disponibles para graficar.")
    ############################################################################


if __name__ == "__main__":
    import sys
    survey_id = sys.argv[1] if len(sys.argv) > 1 else 1
    main(survey_id)
