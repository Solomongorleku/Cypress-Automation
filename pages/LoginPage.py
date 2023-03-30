from pages.BasePage import BasePage
from selenium.webdriver.common.by import By

class LoginPage(BasePage):
    TXT_USERNAME = (By.ID, "username")
    TXT_PASSWORD = (By.ID, "password")
    BTN_LOGIN = (By.ID, "loginButton")
    MSG_INVALIDCREDS = (By.XPATH, "//div[@role='alert']")
    MARKETPLACE = (By.XPATH, '//*[@id="root"]/div[1]/div[1]/div[5]')
    HS = (By.XPATH, '//*[@id="root"]/div[1]/div[1]/div[6]')
    LABS = (By.XPATH, '//*[@id="health-services"]/div[1]/div/div/a[1]')

    """Constructor of CarrersPage class"""

    def __init__(self, driver):
        super().__init__(driver)

    def enter_login_credentials(self, user, pwd):
        self.input_element(self.TXT_USERNAME, user)
        self.input_element(self.TXT_PASSWORD, pwd)

    # def enter_username(self,user):
    #     self.input_element(self.TXT_USERNAME, user)

    # def enter_password(self, pwd):
    #     self.input_element(self.TXT_PASSWORD, pwd)


    def enter_login(self):
        self.click_element(self.BTN_LOGIN)

    
    def enter_marketplace(self):
         self.click_element(self.MARKETPLACE)


    def enter_health(self):
        self.click_element(self.HS)


    def enter_labs(self):
        self.click_element(self.LABS)



    # def validateTitle(self):
    #     assert self.get_title() == "OrangeHRM"

    # def validateInvalidCreds(self):
    #     assert self.get_element_text(self.MSG_INVALIDCREDS) == "Your username and password didn't match. Please try again."

    #def validateEmptyUsername(self):
        #assert self.get_element_text(self.MSG_INVALIDCREDS) == "Username cannot be empty"

    #def validateEmptyPassword(self):
        #assert self.get_element_text(self.MSG_INVALIDCREDS) == "Password cannot be empty"