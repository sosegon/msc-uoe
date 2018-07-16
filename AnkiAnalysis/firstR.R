install.packages("gapminder")
library("gapmider")
data("gapminder")
summary(gapminder)
x <- mean(gapminder$gdpPercap)
x

attach(gapminder)
median(pop)
hist(log(pop))
boxplot(lifeExp ~ continent)
plot(lifeExp ~ log(gdpPercap))

install.packages("dplyr")
library(dplyr)

df1 <- gapminder %>% select(country, lifeExp) %>%
  filter(country == "South Africa" |
           country == 'Ireland') %>%
  group_by(country) %>% 
  summarise(Average_life = mean(lifeExp))

t.test(data = df1, lifeExp ~ country)
library(ggplot2)

gapminder %>%
  filter(gdpPercap < 50000) %>%
  ggplot(aes(x=log(gdpPercap), y=lifeExp, col=continent, size=pop)) +
  geom_point(alpha=0.3)+
  geom_smooth(method = lm)+
  facet_wrap(~continent)

summary(lm(lifeExp ~ gdpPercap+pop))

        