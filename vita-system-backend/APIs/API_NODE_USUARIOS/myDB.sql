
CREATE TABLE `logs` (
  `id` int NOT NULL,
  `data_c` date NOT NULL,
  `server` int NOT NULL,
  `dados` text NOT NULL,
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `logs` (`id`, `data_c`, `server`, `dados`) VALUES
(1, '2023-10-15', 1, '\'{data:\"2023-09-16 11:15:56\",altitude:1500568.5,temperatura: \"-10º c\",co2:0.00005,LDR:1.55}\''),
(2, '2023-10-16', 1, '{data:\"2023-09-16 11:15:56\",altitude:1500568.5,temperatura: \"-10º c\",co2:0.00005,LDR:1.55}'),
(3, '2023-10-17', 1, '{data:\"2023-09-17 11:15:56\",altitude:1500568.5,temperatura: \"-10º c\",co2:0.00005,LDR:1.55}'),
(4, '2023-10-18', 1, '{data:\"2023-09-18 11:15:56\",altitude:1500568.5,temperatura: \"-10º c\",co2:0.00005,LDR:1.55}'),
(5, '2023-10-19', 1, '{data:\"2023-09-19 11:15:56\",altitude:1500568.5,temperatura: \"-10º c\",co2:0.00005,LDR:1.55}'),
(6, '2023-11-11', 666, '{\"campo1\": \"valor1\", \"campo2\": \"valor2\"}'),
(7, '2023-11-11', 666, '{\"campo1\": \"valor1\", \"campo2\": \"valor2\"}');


ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;
