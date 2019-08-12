
-- Get all Pokemon names
select name from pokemon;

-- Get all Pokemon that can learn a specific move
select * from pokemon p
    left join pokemon_move pm on p.id = pm.pokemon_id
    left join move m on m.id = pm.move_id
    where m.name = :move_name;

-- Get all the Pokemon that are associated with a specific trainer
select * from pokemon p
    left join pokemon_trainer pt on p.id = pt.pokemon_id
    left join trainer t on t.id = pt.trainer_id
    where t.name = :trainer_name;

-- General read queries for entities.
select id, name from type;
select id, name from trainer;
select id, name, power, accuracy from move;

-- Lookup effects
select id, name from effect;

-- Retrieve types for a specific Pokemon
select t.id, t.name from pokemon_type pt
    join type t on pt.type_id = t.id
    where pt.pokemon_id = :id;

-- Retrieve effects of a specific type on other types.
select te.type_id2, t.name, te.effect_id, e.name from type_effect te
    join effect e on te.effect_id = e.id
    join type t on te.type_id2 = t.id
    where te.type_id1 = :id;



-- Add new Pokemon
insert into pokemon values (:id, :pokemon_name, :evolution_id, :description);

-- Delete a Pokemon
delete from pokemon where id = :id;

-- Add new Type
insert into type values (:name);

-- Delete a Type
delete from type where id = :id;

-- Add new Move
insert into move values (:id, :name, :power, :accuracy);

-- Delete a move
delete from move where id = :id;

-- Add new Trainer
insert into trainer values (:name);

-- Delete a Trainer
delete from trainer where id = :id;

-- Add new Pokemon Move
insert into pokemon_move values (:pokemon_id, :move_id);

-- Delete a Pokemon Move
delete from trainer where pokemon_id = :pokemon_id;

-- Add new Pokemon Type
insert into pokemon_type values (:pokemon_id, :type_id);

-- Delete a Pokemon Type
delete from pokemon_type where pokemon_id = :pokemon_id;

-- Add new Trainer Type
insert into trainer_type values (:trainer_id, :type_id);

-- Delete a Trainer Type
delete from trainer_type where trainer_id = :trainer_id;

-- Add new Pokemon to a Trainer
insert into pokemon_trainer values (:pokemon_id, :trainer_id);

-- Delete a Pokemon from a Trainer
delete from pokemon_trainer where pokemon_id = :pokemon_id;

-- Add new Type to Type Effect relationship
insert into type_effect values (:type_id1, :type_id2, :effect_id);

-- Delete a ype to Type Effect relationship
delete from type_effect where type_id1 = :type_id;



-- Update a move
update pokemon set name = :name, evolution = :evolution, description = :description where id = :id;

-- Update a move
update move set name = :name, power = :power, accuarcy = :accuarcy where id = :id;

-- Update a type
update move set name = :name where id = :id;

-- Update a trainer
update trainer set name = :name where id = :id;

