INSERT INTO departments (name)
VALUES ("Sales"),
    ("Finance"),
    ("IT"),
    ("Customer Relations");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Representative", 50000, 1),
    ("Financial Advisor", 80000, 2),
    ("Project Coordinator", 75000, 3),
    ("Customer Service Representative", 45000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Violet", "Sorrengail", 1, 1),
    ("Xaden", "Riorson", 2, 2),
    ("Rhiannon", "Matthias", 3, 3),
    ("Liam", "Mairi", 4, 4);