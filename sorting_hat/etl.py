import io
import requests
import pandas as pd
import plotly.express as px
import plotly.io as pio

# def generate_plots(survey_id):
#     # Obtener los datos de la API
#     get_answers_url = f'https://sortinghat-api.onrender.com/api/surveys/{survey_id}/results/overall/'

#     try:
#         response = requests.get(get_answers_url)
        
#         # Verifica si hay algún problema en esta llamada
#         if response.status_code != 200:
#             # Maneja errores de la solicitud
#             raise Exception(f"EEEEEEEError al obtener respuestas: {response.status_code}")
        
#         response.raise_for_status()
#         data = response.json()
#     except requests.exceptions.RequestException as e:
#         print(f'Error al obtener los datos: {e}')
#         return None

#     if not data:
#         print('No se pudieron obtener los datos.')
#         return None

#     df = pd.DataFrame(data)
#     df_main = df.drop(columns=['id', 'user', 'survey', 'question11', 'question12', 'question13'])
#     df_sex = df['question11'].dropna()
#     df_age = df['question12'].dropna()
#     df_religion = df['question13'].dropna()

#     # Crear los gráficos
#     plots = {}

#     # Gráfico MAIN
#     result_columns = [f'question{i}' for i in range(1, 11)]
#     df_main[result_columns] = df_main[result_columns].apply(pd.to_numeric, errors='coerce')
#     df_mean = df_main[result_columns].mean()

#     df_mean_plot = pd.DataFrame({'question': df_mean.index, 'mean_score': df_mean.values})
#     df_mean_plot['question'] = df_mean_plot['question'].apply(lambda x: x.replace('question', 'Q'))

#     fig = px.bar(
#         df_mean_plot,
#         x='question',
#         y='mean_score',
#         title='Mean Score by Question',
#         labels={'question': 'Question', 'mean_score': 'Mean Score'},
#         color='question',
#         color_discrete_sequence=px.colors.qualitative.Bold,
#     )
#     fig.update_traces(texttemplate='%{y:.1f}', textposition='outside')
#     fig.update_layout(
#         template='plotly_dark',
#         xaxis_title='Question',
#         yaxis_title='Mean Score',
#         showlegend=False,
#         plot_bgcolor='rgba(0,0,0,0)',
#         paper_bgcolor='rgba(0,0,0,0)',
#         margin=dict(l=0, r=0, t=70, b=0),
#         title={'x': 0.5, 'y': 0.95}
#     )

#     # Convertir a imagen en memoria
#     img_main = io.BytesIO()
#     pio.write_image(fig, img_main, format='png')
#     img_main.seek(0)
#     plots['main'] = img_main

#     # Gráfico SEX (q11)
#     if 'question11' in df.columns and not df['question11'].dropna().empty:
#         sex_counts = df_sex.value_counts()
#         df_sex_plot = pd.DataFrame({'sex': sex_counts.index, 'count': sex_counts.values})
#         fig_sex = px.pie(df_sex_plot, names='sex', values='count', title='Percent of men vs women', hole=0.5,
#                          color_discrete_sequence=['#0d8c22', '#6a0cad'])
#         fig_sex.update_layout(
#             template='plotly_dark',
#             plot_bgcolor='rgba(0,0,0,0)',
#             paper_bgcolor='rgba(0,0,0,0)',
#             margin=dict(l=0, r=0, t=50, b=0),
#             legend=dict(orientation='v', x=0.8),
#             title={'x': 0.5},
#             font=dict(size=19)
#         )

#         img_sex = io.BytesIO()
#         pio.write_image(fig_sex, img_sex, format='png')
#         img_sex.seek(0)
#         plots['sex'] = img_sex

#     # Gráfico RELIGION (q13)
#     if 'question13' in df.columns and not df['question13'].dropna().empty:
#         religion_counts = df_religion.value_counts()
#         df_religion_plot = pd.DataFrame({'religion': religion_counts.index, 'count': religion_counts.values})
#         religion_colors = {'christian': '#b00000', 'muslim': '#2dad02', 'hindu': '#ad5a02',
#                            'jewish': '#66b3ff', 'buddhist': '#a6a002', 'other': '#802fba', 'unbeliever': '#696966'}
#         colors = [religion_colors[religion] for religion in religion_counts.index]

#         fig_rel = px.pie(df_religion_plot, names='religion', values='count', title='Percent of religion',
#                          color_discrete_sequence=colors)
#         fig_rel.update_layout(
#             template='plotly_dark',
#             plot_bgcolor='rgba(0,0,0,0)',
#             paper_bgcolor='rgba(0,0,0,0)',
#             margin=dict(l=0, r=0, t=50, b=0),
#             legend=dict(orientation='v', xanchor='right'),
#             title={'x': 0.5},
#             font=dict(size=18)
#         )

#         img_rel = io.BytesIO()
#         pio.write_image(fig_rel, img_rel, format='png')
#         img_rel.seek(0)
#         plots['religion'] = img_rel

#     # Gráfico AGE (q12)
#     if 'question12' in df.columns and not df['question12'].dropna().empty:
#         age_counts = df_age.value_counts()
#         df_age_plot = pd.DataFrame({'age': age_counts.index, 'count': age_counts.values})

#         fig_age = px.histogram(df_age_plot, x='age', y='count', title='Age of the respondents',
#                                nbins=10, labels={'age': 'Age', 'count': 'Persons'})
#         fig_age.update_layout(
#             template='plotly_dark',
#             plot_bgcolor='rgba(0,0,0,0)',
#             paper_bgcolor='rgba(0,0,0,0)',
#             margin=dict(l=0, t=70, r=0, b=0),
#             title={'x': 0.5, 'y': 0.90}
#         )

#         img_age = io.BytesIO()
#         pio.write_image(fig_age, img_age, format='png')
#         img_age.seek(0)
#         plots['age'] = img_age

#     return plots

import io
import plotly.graph_objects as go
import plotly.io as pio
from django.http import JsonResponse

# def generate_plots(id_survey):
#     # Ejemplo simple de creación de un gráfico
#     fig = go.Figure(data=[go.Bar(y=[1, 3, 2])])
#     img_main = io.BytesIO()
#     pio.write_image(fig, img_main, format='png')
#     img_main.seek(0)
#     return {'main': img_main}


# def generate_plots(request, survey_id):
#     # Obtener los datos de la API
#     get_answers_url = f'https://sortinghat-api.onrender.com/api/surveys/{survey_id}/results/overall/'

#     try:
#         response = requests.get(get_answers_url)
#         if response.status_code != 200:
#             raise Exception(f"Error al obtener respuestas: {response.status_code}")
#         response.raise_for_status()
#         data = response.json()
#     except requests.exceptions.RequestException as e:
#         print(f'Error al obtener los datos: {e}')
#         return JsonResponse({'error': str(e)}, status=500)

#     if not data:
#         print('No se pudieron obtener los datos.')
#         return JsonResponse({'error': 'No se pudieron obtener los datos.'}, status=500)

#     df = pd.DataFrame(data)
#     df_main = df.drop(columns=['id', 'user', 'survey', 'question11', 'question12', 'question13'])
#     df_sex = df['question11'].dropna()
#     df_age = df['question12'].dropna()
#     df_religion = df['question13'].dropna()

#     # Crear los gráficos
#     plots = {}

#     # Gráfico MAIN
#     result_columns = [f'question{i}' for i in range(1, 11)]
#     df_main[result_columns] = df_main[result_columns].apply(pd.to_numeric, errors='coerce')
#     df_mean = df_main[result_columns].mean()

#     df_mean_plot = pd.DataFrame({'question': df_mean.index, 'mean_score': df_mean.values})
#     df_mean_plot['question'] = df_mean_plot['question'].apply(lambda x: x.replace('question', 'Q'))

#     fig = px.bar(
#         df_mean_plot,
#         x='question',
#         y='mean_score',
#         title='Mean Score by Question',
#         labels={'question': 'Question', 'mean_score': 'Mean Score'},
#         color='question',
#         color_discrete_sequence=px.colors.qualitative.Bold,
#     )
#     fig.update_traces(texttemplate='%{y:.1f}', textposition='outside')
#     fig.update_layout(
#         template='plotly_dark',
#         xaxis_title='Question',
#         yaxis_title='Mean Score',
#         showlegend=False,
#         plot_bgcolor='rgba(0,0,0,0)',
#         paper_bgcolor='rgba(0,0,0,0)',
#         margin=dict(l=0, r=0, t=70, b=0),
#         title={'x': 0.5, 'y': 0.95}
#     )

#     # Convertir a imagen en memoria
#     img_main = io.BytesIO()
#     pio.write_image(fig, img_main, format='png')
#     img_main.seek(0)
#     plots['main'] = img_main.getvalue()

#     # Gráfico SEX (q11)
#     if not df_sex.empty:
#         sex_counts = df_sex.value_counts()
#         df_sex_plot = pd.DataFrame({'sex': sex_counts.index, 'count': sex_counts.values})
#         fig_sex = px.pie(df_sex_plot, names='sex', values='count', title='Percent of men vs women', hole=0.5,
#                          color_discrete_sequence=['#0d8c22', '#6a0cad'])
#         fig_sex.update_layout(
#             template='plotly_dark',
#             plot_bgcolor='rgba(0,0,0,0)',
#             paper_bgcolor='rgba(0,0,0,0)',
#             margin=dict(l=0, r=0, t=50, b=0),
#             legend=dict(orientation='v', x=0.8),
#             title={'x': 0.5},
#             font=dict(size=19)
#         )

#         img_sex = io.BytesIO()
#         pio.write_image(fig_sex, img_sex, format='png')
#         img_sex.seek(0)
#         plots['sex'] = img_sex.getvalue()

#     # Gráfico RELIGION (q13)
#     if not df_religion.empty:
#         religion_counts = df_religion.value_counts()
#         df_religion_plot = pd.DataFrame({'religion': religion_counts.index, 'count': religion_counts.values})
#         religion_colors = {'christian': '#b00000', 'muslim': '#2dad02', 'hindu': '#ad5a02',
#                            'jewish': '#66b3ff', 'buddhist': '#a6a002', 'other': '#802fba', 'unbeliever': '#696966'}
#         colors = [religion_colors.get(religion, '#696966') for religion in religion_counts.index]

#         fig_rel = px.pie(df_religion_plot, names='religion', values='count', title='Percent of religion',
#                          color_discrete_sequence=colors)
#         fig_rel.update_layout(
#             template='plotly_dark',
#             plot_bgcolor='rgba(0,0,0,0)',
#             paper_bgcolor='rgba(0,0,0,0)',
#             margin=dict(l=0, r=0, t=50, b=0),
#             legend=dict(orientation='v', xanchor='right'),
#             title={'x': 0.5},
#             font=dict(size=18)
#         )

#         img_rel = io.BytesIO()
#         pio.write_image(fig_rel, img_rel, format='png')
#         img_rel.seek(0)
#         plots['religion'] = img_rel.getvalue()

#     # Gráfico AGE (q12)
#     if not df_age.empty:
#         age_counts = df_age.value_counts()
#         df_age_plot = pd.DataFrame({'age': age_counts.index, 'count': age_counts.values})

#         fig_age = px.histogram(df_age_plot, x='age', y='count', title='Age of the respondents',
#                                nbins=10, labels={'age': 'Age', 'count': 'Persons'})
#         fig_age.update_layout(
#             template='plotly_dark',
#             plot_bgcolor='rgba(0,0,0,0)',
#             paper_bgcolor='rgba(0,0,0,0)',
#             margin=dict(l=0, t=70, r=0, b=0),
#             title={'x': 0.5, 'y': 0.90}
#         )

#         img_age = io.BytesIO()
#         pio.write_image(fig_age, img_age, format='png')
#         img_age.seek(0)
#         plots['age'] = img_age.getvalue()

#     return JsonResponse({key: img.decode('utf-8') for key, img in plots.items()}, safe=False)





# def generate_plots(id_survey):
#     # Ejemplo simple de creación de un gráfico
#     fig = go.Figure(data=[go.Bar(y=[1, 3, 2])])
#     img_main = io.BytesIO()
#     pio.write_image(fig, img_main, format='png')
#     img_main.seek(0)
#     return {'main': img_main}

import logging
logger = logging.getLogger('myapp')

def get_data(survey_id):
    # Obtener los datos de la API
    # get_answers_url = f'http://localhost:8000/api/surveys/{survey_id}/results/overall/'
    get_answers_url = f'https://sortinghat-api.onrender.com/api/surveys/{survey_id}/results/overall/'

    try:
        response = requests.get(get_answers_url)
        if response.status_code != 200:
            raise Exception(f"Error al obtener respuestas: {response.status_code}")
        response.raise_for_status()
        data = response.json()
        logger.debug('EEEEEETTTTTTLLLLL data->>>> %s', data)
    except requests.exceptions.RequestException as e:
        logger.error('Error al obtener los datos: %s', e)
        return JsonResponse({'error': str(e)}, status=500)

    if not data:
        logger.error('No se pudieron obtener los datos.')
        return JsonResponse({'error': 'No se pudieron obtener los datos.'}, status=500)
    
    return data


def generate_plots(request, survey_id, plot_type):
    data = get_data(survey_id)

    if plot_type == 'main':
        return {"main": generate_main_plot(request, data)}
    elif plot_type == 'age':
        return {"age": generate_age_plot(request, data)}
    elif plot_type == 'sex':
        return {"sex": generate_sex_plot(request, data)}
    elif plot_type == 'religion':
        return {"religion": generate_religion_plot(request, data)}
    else:
        raise ValueError("Invalid plot type")


# def generate_main_plot(request, data):
#     df = pd.DataFrame(data)
#     df_main = df.drop(columns=['id', 'user', 'survey', 'question11', 'question12', 'question13'])

#     result_columns = [f'question{i}' for i in range(1, 11)]
#     df_main[result_columns] = df_main[result_columns].apply(pd.to_numeric, errors='coerce')
#     df_mean = df_main[result_columns].mean()

#     df_mean_plot = pd.DataFrame({'question': df_mean.index, 'mean_score': df_mean.values})
#     df_mean_plot['question'] = df_mean_plot['question'].apply(lambda x: x.replace('question', 'Q'))

#     fig = px.bar(
#         df_mean_plot,
#         x='question',
#         y='mean_score',
#         title='Mean Score by Question',
#         labels={'question': 'Question', 'mean_score': 'Mean Score'},
#         color='question',
#         color_discrete_sequence=px.colors.qualitative.Bold,
#     )
#     fig.update_traces(texttemplate='%{y:.1f}', textposition='outside')
#     fig.update_layout(
#         template='plotly_dark',
#         xaxis_title='Question',
#         yaxis_title='Mean Score',
#         showlegend=False,
#         plot_bgcolor='rgba(0,0,0,0)',
#         paper_bgcolor='rgba(0,0,0,0)',
#         margin=dict(l=0, r=0, t=70, b=0),
#         title={'x': 0.5, 'y': 0.95}
#     )
#     # Convertir a imagen en memoria
#     img_main = io.BytesIO()
#     pio.write_image(fig, img_main, format='png')
#     img_main.seek(0)
#     return img_main
def generate_main_plot(request):
    try:
        # Ejemplo simple de creación de un gráfico
        fig = go.Figure(data=[go.Bar(y=[1, 3, 2])])
        img_main = io.BytesIO()
        pio.write_image(fig, img_main, format='png')
        img_main.seek(0)
        logger.debug('Gráfico generado correctamente.')
        return {'main': img_main}
    except Exception as e:
        logger.error('Error al generar el gráfico: %s', e)
        return None
# def generate_plots(id_survey):
#     # Ejemplo simple de creación de un gráfico
#     fig = go.Figure(data=[go.Bar(y=[1, 3, 2])])
#     img_main = io.BytesIO()
#     pio.write_image(fig, img_main, format='png')
#     img_main.seek(0)
#     return {'main': img_main}

def generate_sex_plot(request, data):
    df = pd.DataFrame(data)
    df_sex = df['question11'].dropna()
    
    if not df_sex.empty:
        sex_counts = df_sex.value_counts()
        df_sex_plot = pd.DataFrame({'sex': sex_counts.index, 'count': sex_counts.values})
        fig_sex = px.pie(df_sex_plot, names='sex', values='count', title='Percent of men vs women', hole=0.5,
                         color_discrete_sequence=['#0d8c22', '#6a0cad'])
        fig_sex.update_layout(
            template='plotly_dark',
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, t=50, b=0),
            legend=dict(orientation='v', x=0.8),
            title={'x': 0.5},
            font=dict(size=19)
        )
        img_sex = io.BytesIO()
        pio.write_image(fig_sex, img_sex, format='png')
        img_sex.seek(0)
        return img_sex


def generate_age_plot(request, data):
    df = pd.DataFrame(data)
    df_age = df['question12'].dropna()
    
    if not df_age.empty:
        age_counts = df_age.value_counts()
        df_age_plot = pd.DataFrame({'age': age_counts.index, 'count': age_counts.values})

        fig_age = px.histogram(df_age_plot, x='age', y='count', title='Age of the respondents',
                               nbins=10, labels={'age': 'Age', 'count': 'Persons'})
        fig_age.update_layout(
            template='plotly_dark',
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, t=70, r=0, b=0),
            title={'x': 0.5, 'y': 0.90}
        )

        img_age = io.BytesIO()
        pio.write_image(fig_age, img_age, format='png')
        img_age.seek(0)
        return img_age


def generate_religion_plot(request, data):
    df = pd.DataFrame(data)
    df_religion = df['question13'].dropna()
    
    if not df_religion.empty:
        religion_counts = df_religion.value_counts()
        df_religion_plot = pd.DataFrame({'religion': religion_counts.index, 'count': religion_counts.values})
        religion_colors = {'christian': '#b00000', 'muslim': '#2dad02', 'hindu': '#ad5a02',
                           'jewish': '#66b3ff', 'buddhist': '#a6a002', 'other': '#802fba', 'unbeliever': '#696966'}
        colors = [religion_colors.get(religion, '#696966') for religion in religion_counts.index]

        fig_rel = px.pie(df_religion_plot, names='religion', values='count', title='Percent of religion',
                         color_discrete_sequence=colors)
        fig_rel.update_layout(
            template='plotly_dark',
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, t=50, b=0),
            legend=dict(orientation='v', xanchor='right'),
            title={'x': 0.5},
            font=dict(size=18)
        )

        img_rel = io.BytesIO()
        pio.write_image(fig_rel, img_rel, format='png')
        img_rel.seek(0)
        return img_rel