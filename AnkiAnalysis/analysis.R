install.packages("dplyr")
library(dplyr)
c_users = read.csv("data/connection_users.csv")
c_users <- c_users %>% filter(logs > 0 & logs < 5000)

i_users = read.csv("data/independent_users.csv")
i_users <- i_users %>% filter(logs > 0 & logs < 5000)

cp_users = read.csv("data/public_connection_users.csv")
cp_users <- cp_users %>% filter(logs > 0)

ip_users = read.csv("data/public_independent_users.csv")
ip_users <- i_users %>% filter(logs > 0)



c_logs = read.csv("data/connection_logs.csv")

