Nexus4_means

#einfache Darstellung aber ok
plot(sapply(Nexus7, mean), type="l", col="blue")
lines(sapply(Nexus4, mean), type="l", col="red")

plot(sapply(Nexus7, mean), type="l", col="blue", ylim=c(0,6000))
lines(sapply(Nexus4, mean), type="l", col="red", ylim=c(0,6000))

