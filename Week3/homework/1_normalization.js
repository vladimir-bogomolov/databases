// 1. How can you convert the table into 1NF ?
// Every column has to content an atomic value. We have to create separate rows with atomic values in food_code and food_description columns.

// 2. What are the super, candidate, primary keys in the table created in step (1)?
// Super keys:
// - member_id,
// - member_name,
// - member_id + member_name,
// - all possible combinations of member_name with other columns,
// - all possible combinations of member_id with other columns,
// - all possible combinations of member_id + member_name with other columns.
// Candidate keys:
// - member_id,
// - member_name.
// Primary key:
// - member_id.

// 3. How can you develop the set of 2NF tables? (Think of relationships between different tables).
// We have to divide the table:
// Table Members:
// - member_id - primary key
// - member_name
// - member address
// Table Venues:
// - venue_code - primary key
// - venue_description
// Table Food:
// - food_code primary key
// - food_description
// Table Dinners:
// - dinner_id - primary key
// - dinner_date
// - member_id foreign key
// - venue_code foreign key
// - food_code foreign key 

// 4. How can you develop the set of 3NF tables?
// Tables for step 3 already fits to 3NF.