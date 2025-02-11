from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

#Configuração do WebDriver para o primeiro usuário (test@example.com)
service = Service(ChromeDriverManager().install())
driver_user1 = webdriver.Chrome(service=service)
# driver_user1 = webdriver.Chrome()

# Configuração do WebDriver para o segundo usuário (test2@example.com)
driver_user2 = webdriver.Chrome(service=service)
# driver_user2 = webdriver.Chrome()

try:
    # Passo 1: Realizar login para o usuário 1 (test@example.com)
    driver_user1.get('http://localhost:3000/login')
    time.sleep(2)
    driver_user1.find_element(By.ID, 'email').send_keys('test@example.com')
    driver_user1.find_element(By.ID, 'password').send_keys('Oi@12345')
    driver_user1.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
    time.sleep(2)

    # Passo 2: Realizar login para o usuário 2 (test2@example.com)
    driver_user2.get('http://localhost:3000/login')
    time.sleep(2)
    driver_user2.find_element(By.ID, 'email').send_keys('test2@example.com')
    driver_user2.find_element(By.ID, 'password').send_keys('Oi@12345')
    driver_user2.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
    time.sleep(2)

    # Passo 3: Na instância do usuário 1, clicar no texto "Test2"
    driver_user1.find_element(By.XPATH, "//div[contains(text(), 'Test2')]").click()
    time.sleep(2)

    # Passo 4: Na instância do usuário 2, clicar no botão de configurações e depois em "Logout"
    driver_user2.find_element(By.CSS_SELECTOR, 'button[aria-label="settings"]').click()
    time.sleep(1)
    driver_user2.find_element(By.XPATH, "//li[contains(text(), 'Logout')]").click()
    time.sleep(2)

    # Passo 5: Na instância do usuário 1, enviar uma mensagem
    input_field = driver_user1.find_element(By.ID, 'outlined-basic')
    input_field.send_keys("Olá, Test2!")
    driver_user1.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
    time.sleep(2)

    # Passo 6: Verificar se a mensagem "Usuário está offline" aparece
    if "Usuário está offline" in driver_user1.page_source:
        print("Teste de envio e recebimento de mensagens foi um sucesso! A mensagem 'Usuário está offline' foi encontrada.")
    else:
        print("Teste de envio e recebimento de mensagens falhou. A mensagem 'Usuário está offline' não foi encontrada.")

finally:
    # Fechar os navegadores após o teste
    driver_user1.quit()
    driver_user2.quit()