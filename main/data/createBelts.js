const belts_ddl_sql = `
CREATE TABLE belts (
  beltId            integer primary key AUTOINCREMENT,
  beltTitle         text,
  stripeTitle       text,
  classCount        integer,
  imageSource       text
)
`
const belts_ddl_u1 = `CREATE UNIQUE INDEX belts_beltTitle_IDX ON belts (beltTitle);`

const belts_insert = `
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('White Belt',  'Orange Stripe',  5,  '/belt_images/white-belt-thumbnail.webp')
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Orange Belt', 'Yellow Stripe', 10,  '/belt_images/orange-belt-thumbnail.webp')
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Yellow Belt', 'Blue Stripe',   15,  '/belt_images/yellow-belt-thumbnail.webp')
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Blue Belt',   'Green Stripe',  20,  '/belt_images/blue-belt-thumbnail.webp')
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Green Belt',  'Purple Stripe', 25,  '/belt_images/green-belt-thumbnail.webp')
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Purple Belt',  'Brown Stripe', 30,  '/belt_images/purple-belt-thumbnail.webp')  
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Brown Belt',  '', 25,  '/belt_images/brown-belt-thumbnail.webp')    
  INSERT INTO belts(beltTitle, stripeTitle, classCount, imageSource) VALUES('Black Belt',  '', 25,  '/belt_images/black-belt-thumbnail.webp')    
`
const requirements_ddl_sql = `
  CREATE TABLE requirements (
    requirementId     integer primary key autoincrement,
    beltId            int,
    stripeTitle       text,
    requiredClasses  integer,
    foreign key(beltId) references belts(beltId)
  );

  CREATE UNIQUE INDEX requirements_stripeTitle_IDX ON requirements (stripeTitle);
`

const rank_prefix_ddl = `
  CREATE TABLE rankPrefix (
    rankPrefixId INTEGER PRIMARY KEY AUTOINCREMENT,
    rankPrefixStr TEXT NOT NULL
  )
`
const rank_prefix_inserts = `
  INSERT INTO rankPrefix(rankPrefixStr) VALUES('1st')
  INSERT INTO rankPrefix(rankPrefixStr) VALUES('2nd')
  INSERT INTO rankPrefix(rankPrefixStr) VALUES('3rd')
  INSERT INTO rankPrefix(rankPrefixStr) VALUES('4th')
  INSERT INTO rankPrefix(rankPrefixStr) VALUES('5th')
  INSERT INTO rankPrefix(rankPrefixStr) VALUES('6th')
`
const stripe_requirements_inserts = `
  INSERT INTO requirements (beltId, stripeTitle, requiredClasses)
  WITH RECURSIVE
    cnt(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM cnt WHERE x<5)
  SELECT belts.beltId, 
        pref.rankPrefixStr || ' ' || belts.stripeTitle as stripe_title,
        cnt.x * belts.classCount                       as required_classes
  FROM   cnt        cnt
  join   belts      belts
  join   rankPrefix pref
    on   cnt.x = pref.rankPrefixId 
  where  belts.beltId = 6
`

