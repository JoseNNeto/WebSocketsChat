from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Função para preencher o formulário de login
def preencher_login(driver, email, senha):
    # Esperar até que o campo de email esteja visível e preenchê-lo
    email_field = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "email"))
    )
    email_field.send_keys(email)

    # Esperar até que o campo de senha esteja visível e preenchê-lo
    senha_field = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "password"))
    )
    senha_field.send_keys(senha)
    
    time.sleep(3)

    # Clicar no botão de login
    botao_login = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.TAG_NAME, "button"))
    )
    botao_login.click()

# Função para esperar a lista de usuários aparecer
def esperar_lista_aparecer(driver):
    # Esperar até que o <ul> com a classe específica apareça na página
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "MuiList-root"))
    )
    print("✅ Lista carregada!")

# Função para clicar em um usuário na lista
def clicar_usuario(driver, name):
    """Clica na `<li>` que contém o nome do usuário."""
    user_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, f"//span[contains(text(), '{name}')]/ancestor::li")
        )
    )
    user_element.click()
    print(f"✅ Usuário '{name}' clicado!")

# Função para enviar uma mensagem
def enviar_mensagem(driver, mensagem):
    # Localizar o campo de entrada de mensagem
    campo_mensagem = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//textarea[@placeholder='Digite sua mensagem...']"))
    )
    campo_mensagem.send_keys(mensagem)

    # Clicar no botão de enviar
    botao_enviar = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Enviar')]"))
    )
    botao_enviar.click()
    print(f"✅ Mensagem enviada: '{mensagem}'")

# Função para verificar se a mensagem foi recebida
def verificar_mensagem_recebida(driver, mensagem):
    try:
        # Verificar se a mensagem aparece na interface
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//div[contains(text(), '{mensagem}')]"))
        )
        print(f"✅ Mensagem recebida: '{mensagem}'")
        return True
    except:
        print(f"❌ Mensagem não recebida: '{mensagem}'")
        return False

# Procedimento de teste para envio e recebimento de mensagens
def PT003():
    # Abrir dois navegadores (Usuário A e Usuário B)
    driver_usuario_a = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver_usuario_a.get("http://localhost:3000")

    driver_usuario_b = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver_usuario_b.get("http://localhost:3000")

    # Preencher login para os dois usuários
    preencher_login(driver_usuario_a, "usuario_a@gmail.com", "senha123")
    preencher_login(driver_usuario_b, "usuario_b@gmail.com", "senha123")

    # Esperar a lista de usuários aparecer
    esperar_lista_aparecer(driver_usuario_a)
    esperar_lista_aparecer(driver_usuario_b)

    # Clicar nos usuários para iniciar o chat
    clicar_usuario(driver_usuario_a, "Usuario B")
    clicar_usuario(driver_usuario_b, "Usuario A")

    # Enviar uma mensagem do Usuário A para o Usuário B
    mensagem = "Olá, Usuário B!"
    enviar_mensagem(driver_usuario_a, mensagem)

    # Verificar se a mensagem foi recebida pelo Usuário B
    if verificar_mensagem_recebida(driver_usuario_b, mensagem):
        print("✅ Teste de envio e recebimento de mensagens foi um sucesso!")
    else:
        print("❌ Teste de envio e recebimento de mensagens falhou.")

    # Fechar os navegadores após o teste
    time.sleep(5)  # Esperar para visualização
    driver_usuario_a.quit()
    driver_usuario_b.quit()

# Executar o teste
PT003()