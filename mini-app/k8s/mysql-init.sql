USE iotdb;

CREATE TABLE IF NOT EXISTS devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(100),
  status VARCHAR(50)
);

INSERT INTO devices (name, type, status) VALUES
  ('Capteur Température', 'sensor', 'active'),
  ('Caméra IP', 'camera', 'inactive'),
  ('Détecteur Fumée', 'sensor', 'active');
