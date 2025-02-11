from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

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

def esperar_lista_aparecer(driver):
    # Esperar até que o <ul> com a classe específica apareça na página
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "MuiList-root"))
    )
    print("✅ Lista carregada!")
    
def clicar_usuario(driver, name):
    ##Clica na `<li>` que contém o nome 'Chrome'.
    user_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, f"//span[contains(text(), '{name}')]/ancestor::li")
        )
    )
    user_element.click()
    print("✅ Usuário 'Chrome' clicado!")
    
def enviar_mensagem(driver, mensagem):
    """Envia uma mensagem no chat."""
    input_mensagem = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "outlined-basic"))
    )
    input_mensagem.send_keys(mensagem)

    botao_enviar = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Enviar')]"))
    )
    botao_enviar.click()
    print(f"✅ Mensagem '{mensagem}' enviada!")

def pt004():
    service1 = Service(ChromeDriverManager().install())
    service2 = Service(ChromeDriverManager().install())
    
    # Abrindo os navegadores
    driverChrome1 = webdriver.Chrome(service=service1)
    driverChrome1.get("http://localhost:3000")

    driverChrome2 = webdriver.Chrome(service=service2)
    driverChrome2.get("http://localhost:3000")

    # Preencher login para os dois navegadores
    preencher_login(driverChrome1, "chrome@gmail.com", "chrome")
    preencher_login(driverChrome2, "firefox@gmail.com", "firefox")

    # Esperar a lista aparecer nos dois navegadores
    esperar_lista_aparecer(driverChrome1)
    esperar_lista_aparecer(driverChrome2)
    
    #Esperar apenas para demonstração
    time.sleep(2)
    
    clicar_usuario(driverChrome1, "Firefox")
    clicar_usuario(driverChrome2, "Chrome")
    
    time.sleep(3)
    
    # Enviar mensagens para os dois navegadores
    enviar_mensagem(driverChrome1, "Olá, Chrome!")
    enviar_mensagem(driverChrome2, "Olá, Firefox!")
    
    time.sleep(5)

    # Fechar um dos navegadores
    driverChrome2.quit()
    
    #Enviar mensagem para usuário offline
    enviar_mensagem(driverChrome1, "Está ai, Chrome?")
    
    time.sleep(2)
    
    # Abrir novamente o navegador
    service3 = Service(ChromeDriverManager().install())
    driverChrome3 = webdriver.Chrome(service=service3)
    driverChrome3.get("http://localhost:3000")
    preencher_login(driverChrome3, "firefox@gmail.com", "firefox")
    esperar_lista_aparecer(driverChrome3)
    clicar_usuario(driverChrome3, "Chrome")
    
    time.sleep(3)

    driverChrome1.quit()
    driverChrome3.quit()
pt004()