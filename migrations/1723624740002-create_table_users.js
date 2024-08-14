module.exports = class CreateTableUsers1723624740002 {
  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
                avatar_url VARCHAR(255),
                bio TEXT,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL
            );
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE users;
        `);
  }
};
