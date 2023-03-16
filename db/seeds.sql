INSERT INTO department (dept_name)
VALUES ("Sales"),
        ("Human Resources"),
        ("Production"),
        ("Management");

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 35000, 1),
        ("Sales Associate", 30000, 1),
        ("Production Manager", 25000, 3),
        ("Production Associate", 20000, 3),
        ("General Manager", 50000, 4),
        ("Regional Manager", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Hopkins", 2, 0),
        ("Sloan", "Kitterang", 1, 1),
        ("Dale", "Doback", 3, 0),
        ("Brennan", "Huff", 4, 0),
        ("Derek", "Huff", 5, 1),
        ("Michael", "Scott", 6, 1);