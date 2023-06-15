from lib2to3.pgen2 import driver
from behave import *
from selenium import webdriver
from configuration.config import TestData
from pages.LoginPage import LoginPage
from pages.DashboardPage import HomePage
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time


# out_of_stock_msg = context.driver.find_element(By.XPATH, '/div[@data-testid = "alert"]').get_text()
# print(out_of_stock_msg)

@given('Launch the browser')
def launch_browser(context):
    context.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


@when(u'Open the website')
def open_login_page(context):
    try:
        context.driver.get(TestData.URL)
        context.loginPage = LoginPage(context.driver)
        context.HomePage = HomePage(context.driver)
    except:
        context.driver.close()
        assert False,"Test is failed in open login page section"



@when(u'Provide the username and password')
def enter_login_creds(context):
    try:
        context.loginPage.enter_login_credentials(TestData.USERNAME, TestData.PASSWORD)
    except:
        context.driver.close()
        assert False, "Test is failed in enter login credentials"


@when(u'Click on the Login button')
def enter_login(context):
    try:
        context.loginPage.enter_login()
    except:
        context.driver.close()
        assert False, "Test is failed in enter login"


@when(u'Click on marketplace')
def enter_marketplace(context):
    try:
        context.loginPage.enter_marketplace()
        time.sleep(3)
    except:
        context.driver.close()
        assert False, "Test is failed in opening marketplace"


@when(u'Verify New order button is enabled')
def verify_new_order(context):
    try:
        context.HomePage.validatePageLoaded()
    except:
        context.driver.close()
        assert False, "Test is failed in verifying new order button"


@when(u'Click on New order')
def clicks_new_order(context):
    try:
        context.HomePage.click_new_order()
        time.sleep(3)
    except:
        context.driver.close()
        assert False, "Test is failed in clicking new order"


@when(u'Add some products to cart')
def add_product(context):
    try:
        context.HomePage.add_to_cart()
        time.sleep(3)    
    except:
        context.driver.close()
        assert False, "Test is failed in adding products to cart"


@when(u'Click on the cart button')
def add_product(context):
    try:
        context.HomePage.click_cart_btn()
        time.sleep(3)    
    except:
        context.driver.close()
        assert False, "Test is failed in clicking cart button"


@then(u'Confirm order')
def add_product(context):
    try:
        context.HomePage.confirm_order()
        time.sleep(3)  
    except:
        context.driver.close()
        assert False, "Test is failed in clicking cart button"


@then(u'Confirm message')
def add_product(context):
    try:
        context.HomePage.alert() 
        time.sleep(3)    
    except:
        context.driver.close()
        assert False, "Test is failed in clicking cart button"