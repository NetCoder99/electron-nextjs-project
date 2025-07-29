const dateOffsets = `
  WITH RECURSIVE cte_numbers (n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM cte_numbers WHERE n < 7
  ),
  cte_dateOffsets as (
    SELECT nmbrs.n, '''' || cast(nmbrs.n*-1 as varchar) || ' day''' as dateOffset
    FROM   cte_numbers nmbrs
  )  
  select *
  from   cte_dateOffsets
`
