from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
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
    """Clica na `<li>` que contém o nome 'Chrome'."""
    user_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, f"//span[contains(text(), '{name}')]/ancestor::li")
        )
    )
    user_element.click()
    print("✅ Usuário 'Chrome' clicado!")

def pt006():
    # Abrindo os navegadores
    driverChrome1 = webdriver.Chrome()
    driverChrome1.get("http://localhost:3000")

    driverChrome2 = webdriver.Chrome()
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
    
    time.sleep(5)

    # Fechar os navegadores após o teste
    driverChrome1.quit()
    driverChrome2.quit()

pt006()
