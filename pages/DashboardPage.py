from socket import timeout
from tkinter import Button
from pages.BasePage import BasePage
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import  WebDriverWait
from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import random
import time

class HomePage(BasePage):
    NEW_ORDER = (By.XPATH, '//button[@data-testid = "productListBtn"]')
    ADD_TO_CART = (By.XPATH, '//button[@class = "sc-cSHVUG fPTkkZ"]')
    CART = (By.XPATH, '//button[@aria-label = "Cart"]')
    MSG = (By.XPATH, '//div[@data-testid = "alert"]')
    MSG2 = (By.CSS_SELECTOR, 'div[style="padding-left: 8px; padding-right: 8px;"]')
    PRD = (By.XPATH, '//span[@data-testid="page-title"]')
    NEXT_PAGE = (By.XPATH, '//button[@data-testid="next page"]')
    CONFIRM_BTN = (By.LINK_TEXT, 'Confirm order')
    CON = (By. XPATH, '//button[@class="sc-cSHVUG iXKmAz"]')
    BUTTON = (By. TAG_NAME, 'button')
    PROCEED = (By.XPATH, '//button[text()="Proceed"]')

    def __init__(self, driver):
        super().__init__(driver)

    def validatePageLoaded(self):
         self.verify_element_clickable(self.NEW_ORDER)
         assert self.verify_element_clickable(self.NEW_ORDER) is True

    def click_new_order(self):
        self.click_element(self.NEW_ORDER)
        p = self.get_element_text(self.PRD)
        assert p == 'Product list'
        print(p)
        assert self.verify_element_clickable(self.CART) is False

    def add_to_cart(self):
        self.click_n_elements(self.ADD_TO_CART, 2)
        # self.click_element(self.NEXT_PAGE)
        # time.sleep(3)
        # self.click_n_elements(self.ADD_TO_CART, 5)
        assert self.verify_element_clickable(self.CART) is True

    def click_cart_btn(self):
        self.click_element(self.CART)


    def confirm_order(self):
        buttons = self.get_elements(self.BUTTON)
        for x in buttons:
            if x.text == "Confirm order":
                x.click()
                break
        self.click_element(self.PROCEED)
        time.sleep(3)

    def alert(self):
        current = self.driver.get_current_url()
        print(current)
        assert "outgoing" in current.lower()
        # suc_msg = self.get_element_text(self.MSG2, timeout=5)
        # assert 'Order' in suc_msg
        # print(suc_msg)
        # for x in msg:
        #     if x.text == "8":
        #         assert 'order' in x.text
        #         print(x)
        #         print(x.text)

        

    def add_to_carts(self):
        add_to_cart_btns = self.driver.find_elements(self.ADD_TO_CART)
        product_count = len(add_to_cart_btns)

        if product_count == 0:
            raise NoSuchElementException("No add to cart button found on page")

        random_product = random.randint(0, product_count - 1)
        add_to_cart_btns[random_product].click()

        try:
            WebDriverWait(self.driver, 5).until(EC.visibility_of_element_located(self.MSG))
            warning_msg = self.driver.find_element(self.MSG)
            assert "out of stock" in warning_msg.text.lower()
        except TimeoutException:
            pass

    
    def add_to_cart_new(self):
        add_to_cart_buttons = self.get_elements(self.ADD_TO_CART)
        clicked_out_of_stock = False
    
        # Click on a random add to cart button
        random_buttons = random.sample(add_to_cart_buttons, 5)
        for button in random_buttons:
            button.click()
            time.sleep(6)
        
        
        # Check if any of the clicked products are out of stock
        for button in random_buttons:
            try:
                out_of_stock_msg = self.get_element_text(self.PRD, timeout=3)
                print(out_of_stock_msg)
                if "Product" in out_of_stock_msg:
                    clicked_out_of_stock = True
                    assert "list" in out_of_stock_msg
                    break
            except NoSuchElementException:
                pass

    # If at least one clicked product is out of stock, assert the warning message
            if clicked_out_of_stock:
                assert "currently unavailable at the warehouse" in out_of_stock_msg
            else:
                assert False
