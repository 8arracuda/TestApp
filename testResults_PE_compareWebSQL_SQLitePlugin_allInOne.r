Nexus7_websql <- sapply(Nexus7, mean)[seq(49,64)] #websql
Nexus7_sqlite <- sapply(Nexus7, mean)[seq(65,80)] #sqlite plugin

IOS_websql <- sapply(IOSSim, mean)[seq(49,64)] #websql
IOS_sqlite <- sapply(IOSSim, mean)[seq(65,80)] #sqlite plugin

WP8_websql <- sapply(Lumia620, mean)[seq(49,64)] #websql
WP8_sqlite <- sapply(Lumia620, mean)[seq(65,80)] #sqlite plugin

png("/Users/michael/Dropbox/_BachelorThesis/results/WebSQL_vs_SQLitePlugin/WebSQL_vs_SQLitePlugin_allInOne.png", width = 1000, height = 480)

tmp_min<-0
#tmp_max<-7000
tmp_max<-17000

plot(Nexus7_sqlite, ylim=c(tmp_min, tmp_max), lty=1, type="l", col="blue", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden")
lines(Nexus7_websql, ylim=c(tmp_min, tmp_max), lty=4, col="blue")

lines(IOS_sqlite, ylim=c(tmp_min, tmp_max), col="red", lty=1)
lines(IOS_websql, ylim=c(tmp_min, tmp_max), col="red", lty=4)

lines(WP8_sqlite, ylim=c(tmp_min, tmp_max), col="green", lty=1)
lines(WP8_websql, ylim=c(tmp_min, tmp_max), col="green", lty=1)
#plot(IOS_sqlite, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="time in ms", main="iOS")
#lines(IOS_websql, ylim=c(0, 7000), col="blue")
legend(12,10000, c("Android SQLite Plugin","Android Web SQL", "iOS SQLite Plugin","iOS Web SQL", "WP8 SQLite Plugin","WP8 Web SQL"), lty=c(1,4,1,4,1,4), lwd=c(2.5,2.5,2.5,2.5,2.5,2.5),col=c("blue","red","green"))

#plot(WP8_sqlite, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="time in ms", main="Windows Phone 8")
#lines(WP8_websql, ylim=c(0, 7000), col="blue")
dev.off();