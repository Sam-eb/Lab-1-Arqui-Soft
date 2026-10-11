package com.udea.lab1arq.controller;

import com.udea.lab1arq.DTO.TransactionDTO;
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
class TransactionControllerTest {

    @Autowired
    private TransactionController transactionController;

    @Autowired
    private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {
        customerRepository.save(new Customer(null, "ACC001", "Juan", "Perez", 500.0));
        customerRepository.save(new Customer(null, "ACC002", "Maria", "Gomez", 300.0));
    }

    private TransactionDTO buildRequest(String senderAcc, String receiverAcc, Double amount) {
        TransactionDTO dto = new TransactionDTO();
        dto.setSenderAccountNumber(senderAcc);
        dto.setReceiverAccountNumber(receiverAcc);
        dto.setAmount(amount);
        return dto;
    }

    @Test
    void transferMoney_success_returnsOk() {
        ResponseEntity<?> response = transactionController.transferMoney(buildRequest("ACC001", "ACC002", 100.0));

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void transferMoney_insufficientBalance_returnsBadRequest() {
        ResponseEntity<?> response = transactionController.transferMoney(buildRequest("ACC001", "ACC002", 999999.0));

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Saldo insuficiente en la cuenta del remitente.", response.getBody());
    }

    @Test
    void transferMoney_receiverNotFound_returnsBadRequest() {
        ResponseEntity<?> response = transactionController.transferMoney(buildRequest("ACC001", "NOEXISTE", 50.0));

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("La cuenta del receptor no existe.", response.getBody());
    }

    @Test
    void getTransactionsByAccount_afterTransfer_returnsList() {
        transactionController.transferMoney(buildRequest("ACC001", "ACC002", 50.0));

        List<TransactionDTO> result = transactionController.getTransactionsByAccount("ACC001");

        assertEquals(1, result.size());
        assertEquals("ACC001", result.get(0).getSenderAccountNumber());
    }

    @Test
    void getTransactionsByAccount_noTransactions_returnsEmptyList() {
        List<TransactionDTO> result = transactionController.getTransactionsByAccount("ACC001");

        assertTrue(result.isEmpty());
    }
}