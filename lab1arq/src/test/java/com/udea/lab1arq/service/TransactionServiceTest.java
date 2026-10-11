package com.udea.lab1arq.service;

import com.udea.lab1arq.DTO.TransactionDTO;
import com.udea.lab1arq.entity.Customer;
import com.udea.lab1arq.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TransactionServiceTest {

    @Autowired
    private TransactionService transactionService;

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
        dto.setTimestamp(LocalDateTime.now());
        return dto;
    }

    @Test
    void transferMoney_success_updatesBalances() {
        TransactionDTO result = transactionService.transferMoney(buildRequest("ACC001", "ACC002", 100.0));

        Customer sender = customerRepository.findByAccountNumber("ACC001").orElseThrow();
        Customer receiver = customerRepository.findByAccountNumber("ACC002").orElseThrow();

        assertEquals(400.0, sender.getBalance());
        assertEquals(400.0, receiver.getBalance());
        assertEquals(100.0, result.getAmount());
        assertNotNull(result.getId());
    }

    @Test
    void transferMoney_exactBalance_succeedsAndLeavesZero() {
        transactionService.transferMoney(buildRequest("ACC001", "ACC002", 500.0));

        Customer sender = customerRepository.findByAccountNumber("ACC001").orElseThrow();
        Customer receiver = customerRepository.findByAccountNumber("ACC002").orElseThrow();

        assertEquals(0.0, sender.getBalance());
        assertEquals(800.0, receiver.getBalance());
    }

    @Test
    void transferMoney_nullSenderAccount_throwsException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> transactionService.transferMoney(buildRequest(null, "ACC002", 100.0)));

        assertEquals("Los números de cuenta del remitente y receptor son obligatorios.", ex.getMessage());
    }

    @Test
    void transferMoney_nullReceiverAccount_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> transactionService.transferMoney(buildRequest("ACC001", null, 100.0)));
    }

    @Test
    void transferMoney_senderNotFound_throwsException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> transactionService.transferMoney(buildRequest("NOEXISTE", "ACC002", 50.0)));

        assertEquals("La cuenta del remitente no existe.", ex.getMessage());
    }

    @Test
    void transferMoney_receiverNotFound_throwsException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> transactionService.transferMoney(buildRequest("ACC001", "NOEXISTE", 50.0)));

        assertEquals("La cuenta del receptor no existe.", ex.getMessage());
    }

    @Test
    void transferMoney_insufficientBalance_throwsException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> transactionService.transferMoney(buildRequest("ACC001", "ACC002", 999999.0)));

        assertEquals("Saldo insuficiente en la cuenta del remitente.", ex.getMessage());

        // Los saldos no deben haber cambiado
        Customer sender = customerRepository.findByAccountNumber("ACC001").orElseThrow();
        assertEquals(500.0, sender.getBalance());
    }

    @Test
    void getTransactionsForAccount_returnsSavedTransaction() {
        transactionService.transferMoney(buildRequest("ACC001", "ACC002", 50.0));

        List<TransactionDTO> result = transactionService.getTransactionsForAccount("ACC001");

        assertEquals(1, result.size());
        assertEquals("ACC001", result.get(0).getSenderAccountNumber());
        assertEquals("ACC002", result.get(0).getReceiverAccountNumber());
    }

    @Test
    void getTransactionsForAccount_noTransactions_returnsEmptyList() {
        List<TransactionDTO> result = transactionService.getTransactionsForAccount("ACC001");

        assertTrue(result.isEmpty());
    }
}