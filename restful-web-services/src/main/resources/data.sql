insert into lists(list_id, username, list_name)
values(1, 'alpaslan', 'yapılmayacak');

insert into lists(list_id, username, list_name)
values(2, 'alpaslan', 'yarına kalanlar');

insert into lists(list_id, username, list_name)
values(3, 'huawei', 'bugün yapılacaklar');

insert into todo(todo_id, todo_name, description, target_date, is_done, list_id)
values(1, 'ekmek al', 'Learn JPA', sysdate(), FALSE, 1);

insert into todo(todo_id, todo_name, description, target_date, is_done, list_id)
values(2, 'çorba yap','Learn Data JPA', sysdate(), FALSE, 2);

insert into todo(todo_id, todo_name, description, target_date, is_done, list_id)
values(3, 'ilaç iç', 'Learn Microservices', sysdate(), TRUE, 1);

insert into todo(todo_id, todo_name, description, target_date, is_done, list_id)
values(4, 'dondurma ye', 'Learn Micro', sysdate(), TRUE, 3);