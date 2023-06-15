from selenium.webdriver import ActionChains
from  selenium.webdriver.support.ui import  WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import ElementClickInterceptedException, ElementNotVisibleException, TimeoutException, NoSuchElementException, ElementNotInteractableException, InvalidElementStateException, InvalidSelectorException as EX
import random

"""This class is the parent of all the page classes"""
"""It contains all the common action methods and utilities for all the pages"""

class BasePage:

    def __init__(self, driver):
        self.driver = driver

    def click_element(self, by_locator):
        try:
            element = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(by_locator))
            self.driver.execute_script("arguments[0].click();", element)
        except EX as e:
            print("Exception! Can't click on the element")

    def input_element(self, by_locator, text):
        try:
            WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(by_locator)).send_keys(text)
        except EX as e:
            print("Exception! Can't click on the element")

    def get_element_text(self, by_locator):
        element = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(by_locator))
        return element.text


    def get_elements_text(self, by_locator):
        elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
        return elements.text


    def get_title(self):
        return self.driver.title

    def get_element_attribute(self, by_locator, attribute_name):
        element = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(by_locator))
        return element.get_attribute(attribute_name)

    def verify_element_displayed(self, by_locator):
        try:
            element = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(by_locator))
            return element.is_displayed()
        except:
            return False

    def verify_element_clickable(self, by_locator):
        try:
            element = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(by_locator))
            return element.is_enabled()
        except:
            return False


    # def click_all_buttons(self, by_locator):
    #     elements = self.wait.until(EC.presence_of_all_elements_located((by_locator))
    #     for e in elements:
    #         e.click()


    def click_elements(self, by_locator):
        try:
            elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
            for ele in elements:
                ele.click()
        except EX as e:
            print("Exception! Can't click on the element")


    def click_n_elements(self, by_locator,n):
        try:
            elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
            for i in range(n):
                elements[i].click()
                # try:
                #     warning_message = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located((By.XPATH, '//div[@data-testid = "alert"]')))
                #     assert "currently unavailable at the warehouse" in warning_message.text
                # except AssertionError as e:
                #     print(e)
        except EX as e:
            print("Exception! Can't click on the element")


    def click_n_elements_randomly(self, by_locator,n):
        try:
            elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
            rand_elements = random.sample(elements, n)
            for ele in rand_elements:
                ele.click()
        except EX as e:
            print("Exception! Can't click on the element")


    def get_elements(self, by_locator):
        try:
            elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
            return elements
        except:
            return False


    def click_n_elements_randomlys(self, by_locator, n):
        try:
            elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
            clicked_elements = set()
            for _ in range(n):
            # Choose an element that hasn't been clicked yet
                unclicked_elements = [ele for ele in elements if ele not in clicked_elements]
                if not unclicked_elements:
                    break  # No more elements left to click
                ele = random.choice(unclicked_elements)
                ele.click()
                clicked_elements.add(ele)
        except EX as e:
            print("Exception! Can't click on the element")


    def click_n_elements_randomlyy(self, by_locator, n):
        try:
            elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
            rand_elements = random.sample(elements, n)
            for i in range(n):
                rand_elements[i].click()
                rand_elements.pop(i)
                elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located(by_locator))
                rand_elements.append(random.choice(elements))
        except Exception as e:
            print("Exception! Can't click on the element")