package com.udea.lab1arq.service;

import com.udea.lab1arq.DTO.CustomerDTO;
import com.udea.lab1arq.entity.Customer;
import com.udea.lab1arq.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CustomerServiceTest {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    private Customer customer;

    @BeforeEach
    void setUp() {
        customer = customerRepository.save(new Customer(null, "ACC001", "Juan", "Perez", 1000.0));
    }

    @Test
    void getAllCustomer_returnsSavedCustomer() {
        List<CustomerDTO> result = customerService.getAllCustomer();

        assertFalse(result.isEmpty());
        assertTrue(result.stream().anyMatch(c -> c.getAccountNumber().equals("ACC001")));
    }

    @Test
    void getCustomerById_existingId_returnsCustomer() {
        CustomerDTO result = customerService.getCustomerById(customer.getId());

        assertNotNull(result);
        assertEquals("Juan", result.getFirstName());
        assertEquals("ACC001", result.getAccountNumber());
    }

    @Test
    void getCustomerById_nonExistingId_throwsException() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> customerService.getCustomerById(999999L));

        assertEquals("Customer not found", ex.getMessage());
    }

    @Test
    void createCustomer_savesAndReturnsCustomer() {
        CustomerDTO request = new CustomerDTO(null, "Maria", "Gomez", "ACC002", 500.0);

        CustomerDTO result = customerService.createCustomer(request);

        assertNotNull(result.getId());
        assertEquals("ACC002", result.getAccountNumber());
        assertEquals(500.0, result.getBalance());
        assertTrue(customerRepository.findByAccountNumber("ACC002").isPresent());
    }
}