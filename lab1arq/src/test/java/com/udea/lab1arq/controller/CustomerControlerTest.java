package com.udea.lab1arq.controller;

import com.udea.lab1arq.DTO.CustomerDTO;
import com.udea.lab1arq.entity.Customer;
import com.udea.lab1arq.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CustomerControllerTest {

    @Autowired
    private CustomerController customerController;

    @Autowired
    private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {
        customerRepository.save(new Customer(null, "ACC001", "Juan", "Perez", 1000.0));
    }

    @Test
    void getAllCustomers_returnsOkWithData() {
        ResponseEntity<List<CustomerDTO>> response = customerController.getAllCustomers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertFalse(response.getBody().isEmpty());
    }

    @Test
    void getCustomerById_existingId_returnsOk() {
        Customer saved = customerRepository.findByAccountNumber("ACC001").orElseThrow();

        ResponseEntity<CustomerDTO> response = customerController.getCustomerById(saved.getId());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("ACC001", response.getBody().getAccountNumber());
    }

    @Test
    void createCustomer_withValidBalance_returnsOk() {
        CustomerDTO request = new CustomerDTO(null, "Pedro", "Lopez", "ACC003", 200.0);

        ResponseEntity<CustomerDTO> response = customerController.createCustomer(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getId());
    }

    @Test
    void createCustomer_withNullBalance_throwsException() {
        CustomerDTO request = new CustomerDTO(null, "Pedro", "Lopez", "ACC003", null);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> customerController.createCustomer(request));

        assertEquals("Balance cannot be null", ex.getMessage());
    }
}