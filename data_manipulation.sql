
-- Get all Pokemon names
select name from pokemon;

-- Get all Pokemon that can learn a specific move
select * from pokemon p
    left join pokemon_move pm on p.id = pm.pokemon_id
    left join move m on m.id = pm.move_id
    where m.name = :move_name;

-- Get all the Pokemoon that are associated with a specific trainer
select * from pokemon p
    left join pokemon_trainer pt on p.id = pt.pokemon_id
    left join trainer t on t.id = pt.trainer_id
    where t.name = :trainer_name;



-- Add new Pokemon
insert into pokemon values (:id, :pokemon_name, :evolution_id, :description);

-- Delete a Pokemon
delete from pokemon where id = :id;



-- Add new move
insert into move values (:id, :name, :power, :accuarcy)

-- Update a move
update move set id = :id, name = :name, power = :power, accuarcy = :accuarcy where id = :id;





-- Get all Trainers
select * from trainer;

-- Add a new trainer
insert into trainer values (:name);

-- Delete a trainer
delete from trainer where name = :name;



-- 
