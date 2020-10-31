1. Sing Up to Atlas
2. Create a Starter Cluster
3. Create database user
4. Allow access from my IP
5. Import database to csv:
select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;
select * into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;
6. Add first rows with column names in every csv (for city.csv: "ID,Name,CountryCode,District,Population", for country.csv: "code,name,continent,region,surfaceArea,indepYear,population,lifeExpectancy,GNP,GNPOld,localName,governmentForm,headOfState,capital,code2", for coutryLanguage.csv: "countryCode,language,isOfficial,percentage")
7. Go to Atlas and click Connect
8. Download Compass and install
9. Copy connection string to Compass, change password and Database name. Click Connect
10. Create a collection
11. Click Add Data -> Import file. Choose csv, created on step 5.
12. Check a data types for columns -> Import
13. Steps 10-12 for 2 more collections

