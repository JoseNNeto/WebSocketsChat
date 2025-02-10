from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
import time

# # Configuração do WebDriver usando WebDriver Manager
# service = Service(ChromeDriverManager().install())
# driver = webdriver.Chrome(service=service)

##Driver linux
driver = webdriver.Chrome()

try:
    # Passo 1: Acessar a página de login
    driver.get('http://localhost:3000/login')  # Substitua pela URL da sua aplicação
    time.sleep(2)  # Aguarde 2 segundos para a página carregar

    # Passo 2: Preencher o campo de email
    email_field = driver.find_element(By.ID, 'email')
    email_field.send_keys('test@example.com')

    # Passo 3: Preencher o campo de senha
    password_field = driver.find_element(By.ID, 'password')
    password_field.send_keys('Oi@12345')

    # Passo 4: Clicar no botão de login
    login_button = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
    login_button.click()

    # Passo 5: Aguardar a página carregar após o login
    time.sleep(5)

    # Passo 6: Verificar se o texto "Selecione uma sala" está presente na página
    if "Selecione uma sala" in driver.page_source:
        print("Teste de login foi um sucesso! O texto 'Selecione uma sala' foi encontrado.")
    else:
        print("Teste de login falhou. O texto 'Selecione uma sala' não foi encontrado.")

finally:
    # Fechar o navegador após o teste
    driver.quit()