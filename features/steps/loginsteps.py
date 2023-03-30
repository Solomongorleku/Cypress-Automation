# from behave import *
# from selenium import webdriver
# from configuration.config import TestData
# from pages.LoginPage import LoginPage
# from pages.DashboardPage import HomePage
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager

# @given('Launch the browser')
# def launch_browser(context):
#     # if TestData.BROWSER == 'chrome':
#     #     context.driver = webdriver.Chrome(executable_path=TestData.CHROME_EXECUTABLE_PATH)
#     # elif TestData.BROWSER == 'firefox':
#     #     context.driver = webdriver.Firefox(executable_path=TestData.FIREFOX_EXECUTABLE_PATH)
#     # else:
#     #     raise ValueError('Browser is not supported')
#     context.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


# @when(u'Open the website')
# def open_login_page(context):
#     try:
#         context.driver.get(TestData.URL)
#         context.loginPage = LoginPage(context.driver)
#         context.HomePage = HomePage(context.driver)
#     except:
#         context.driver.close()
#         assert False,"Test is failed in open login page section"



# @when(u'Provide the username and password')
# def enter_login_creds(context):
#     try:
#         context.loginPage.enter_login_credentials(TestData.USERNAME, TestData.PASSWORD)
#     except:
#         context.driver.close()
#         assert False, "Test is failed in enter login credentials"


# @when(u'Click on the Login button')
# def enter_login(context):
#     try:
#         context.loginPage.enter_login()
#     except:
#         context.driver.close()
#         assert False, "Test is failed in enter login"


# # @when(u'Login is successful and HomePage is opened')
# # def validate_dashboard_page(context):
# #     try:
# #         context.dashboardpage.validatePageLoaded()
# #     except:
# #         context.driver.close()
# #         assert False, "Test is failed in validating dashboard"


# @when(u'Click on marketplace')
# def enter_marketplace(context):
#     try:
#         context.loginPage.enter_marketplace()
#     except:
#         context.driver.close()
#         assert False, "Test is failed in opening marketplace"


# # @when(u'Click on labs')
# # def enter_health(context):
# #     try:
# #         context.loginPage.enter_labs()
# #     except:
# #         context.driver.close()
# #         assert False, "Test is failed in validating labs"

# # @then(u'Close the browser')
# # def step_impl(context):
# #     context.driver.close()


# # @then(u'Provide the username "{user}" and password "{pwd}"')
# # def enter_invalid_login(context, user, pwd):
# #     try:
# #         context.loginPage.enter_login_credentials(user,pwd)
# #     except:
# #         context.driver.close()
# #         assert False, "Test is failed in enter login"


# # @then(u'Click on the Login button')
# # def enter_login(context):
# #     try:
# #         context.loginPage.enter_login()
# #     except:
# #         context.driver.close()
# #         assert False, "Test is failed in enter login"


# # @then('Login is failed and invlid credential error is displayed')
# # def validate_invalid_login(context):
# #     try:
# #         context.loginPage.validateInvalidCreds()
# #     except:
# #         context.driver.close()
# #         assert False, "Test is failed in validating invalid login"



# # @then(u'Close the browser')
# # def step_impl(context):
# #     context.driver.close()