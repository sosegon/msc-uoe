#install.packages("plyr")
#install.packages("dplyr")
#install.packages("ggplot2")
library(plyr)
library(dplyr)
library(ggplot2)
####################################################################
# Get users and filter the valid only
####################################################################
c_users = read.csv("data/connection_users.csv") %>% 
  filter((date != '' | grepl('lena55', nickName)) &
           !grepl('anse23', nickName)) %>%
  filter(logs > 5)

i_users = read.csv("data/independent_users.csv") %>% 
  filter(date != '' & !grepl('Mike', nickName)) %>%
  filter(logs > 0)

####################################################################
# Get logs and filter the valid only
####################################################################

get_logs <- function(path, users) {
  # Read and filter by valid users
  logs = read.csv(path) %>%
    filter(userId %in% users$id)
  
  # update date format
  logs$date <- as.Date(logs$date, "%Y/%m/%d")
  
  # Filter by period of study
 logs <- logs %>%
   filter(date >= "2018/06/18" & date <= "2018/07/16")
  
  return (logs)
}

c_logs = get_logs("data/connection_logs.csv", c_users)
i_logs = get_logs("data/independent_logs.csv", i_users)

####################################################################
# Compare the number of earned coins in both groups
####################################################################
# Filter the logs
c_logs_assess <- c_logs %>% 
  filter(logType == 'assessCard')
i_logs_assess <- i_logs %>% 
  filter(logType == 'assessCard')

# Plot the comparison in an histogram
c_earned_coins_hist <- hist(c_logs_assess$coinsInCard, plot=FALSE)
i_earned_coins_hist <- hist(i_logs_assess$coinsInCard, plot=FALSE)
plot(0,0,type="n",xlim=c(0,6),ylim=c(0,1000),
     xlab="Earned coins in cards",ylab="",main="Frecuency of earned coins")
plot(c_earned_coins_hist,col="green",density=20,angle=135,add=TRUE)
plot(i_earned_coins_hist,col="blue",density=10,angle=45,add=TRUE)

####################################################################
# Compare the number of earned points in both groups
####################################################################
# Plot the comparison in an histogram
points_bin <- 30
c_earned_points_hist <- hist(c_logs_assess$pointsInCard, plot=FALSE, breaks=points_bin)
i_earned_points_hist <- hist(i_logs_assess$pointsInCard, plot=FALSE, breaks=points_bin)
plot(0,0,type="n",xlim=c(0,points_bin),ylim=c(0,1000),
     xlab="Earned points in cards",ylab="",main="Frecuency of earned points")
plot(c_earned_points_hist,col="green",density=20,angle=135,add=TRUE)
plot(i_earned_points_hist,col="blue",density=10,angle=45,add=TRUE)

####################################################################
# Compare the ease of cards in both groups
####################################################################
c_ease_hist <- hist(c_logs_assess$cardEase, plot=FALSE)
i_ease_hist <- hist(i_logs_assess$cardEase, plot=FALSE)
plot(0,0,type="n",xlim=c(0,4),ylim=c(0,2000),
     xlab="Ease of cards",ylab="",main="Ease of cards")
plot(c_ease_hist,col="green",density=20,angle=135,add=TRUE)
plot(i_ease_hist,col="blue",density=10,angle=45,add=TRUE)

####################################################################
# Compare the variation of reviewed cards over the period study 
# in both groups
####################################################################
logs_in_period <- function(logs, log_type, title) {
  # Group the logs by user, type and date
  logs_by_user <- group_by(logs, userId, logType, date)
  dplyr::summarize(logs_by_user, count=n()) %>%
    filter(logType == log_type) %>%
    ggplot(aes(x=date, y=count)) +
    geom_point() +
    ggtitle(title) +
    labs(x = "Period of study", y = "Number of reviewed cards") +
    facet_wrap(~userId) +
    xlim(as.Date(c('2018/06/18', '2018/07/16'), format="%Y/%m/%d") ) +
    theme(
      strip.background = element_blank(),
      strip.text.x = element_blank()
    )
}
logs_in_period(c_logs, 'assessCard', 'Experimental group')
logs_in_period(i_logs, 'assessCard', 'Control group')

####################################################################
# Compare the variation of checking leaderboard over the period study 
# in both groups
####################################################################
logs_in_period(c_logs, 'checkLeaderboard', 'Experimental group')
logs_in_period(i_logs, 'checkLeaderboard', 'Control group')

####################################################################
# Compare the checking the leaderboard and reviewing cards
####################################################################
logs_in_period2 <- function(logs, log_type1, log_type2, title) {
  # Group the logs by user, type and date
  logs_by_user <- group_by(logs, userId, logType, date)
  dplyr::summarize(logs_by_user, count=n()) %>%
    filter(logType == log_type1 | logType == log_type2) %>%
    ggplot(aes(x=date, y=count, col=logType)) +
    geom_point() +
    ggtitle(title) +
    labs(x = "Period of study", y = "Number of reviewed cards", color='Interaction') +
    facet_wrap(~userId) +
    xlim(as.Date(c('2018/06/18', '2018/07/16'), format="%Y/%m/%d") ) +
    theme(
      strip.background = element_blank(),
      strip.text.x = element_blank()
    )
}
logs_in_period2(c_logs, 'assessCard', 'checkLeaderboard', 'Experimental group')
logs_in_period2(i_logs, 'assessCard', 'checkLeaderboard', 'Control group')

####################################################################
# Compare the playing the game and reviewing cards
####################################################################
logs_in_period2(c_logs, 'assessCard', 'goToGame', 'Experimental group')

####################################################################
# Compare the fail trick and reviewing cards
####################################################################
logs_in_period2(c_logs, 'assessCard', 'failTrick', 'Experimental group')

cp_users = read.csv("data/public_connection_users.csv") %>% 
  filter(logs > 0)

ip_users = read.csv("data/public_independent_users.csv")%>%
  filter(logs > 0)
