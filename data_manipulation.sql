
-- Get all Pokemon names
select name from pokemon

-- Get all Pokemon that can learn a specific move
select * from pokemon p
    left join pokemon_move pm on p.id = pm.pokemon_id
    left join move m on m.id = pm.move_id
    where m.name = :move_name

-- Get all Trainers
select * from trainer

