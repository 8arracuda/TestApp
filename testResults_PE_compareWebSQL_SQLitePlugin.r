Nexus7_websql <- sapply(Nexus7, mean)[seq(49,64)] #websql
Nexus7_sqlite <- sapply(Nexus7, mean)[seq(65,80)] #sqlite plugin

IOS_websql <- sapply(IOSSim, mean)[seq(49,64)] #websql
IOS_sqlite <- sapply(IOSSim, mean)[seq(65,80)] #sqlite plugin

WP8_websql <- sapply(Lumia620, mean)[seq(49,64)] #websql
WP8_sqlite <- sapply(Lumia620, mean)[seq(65,80)] #sqlite plugin

png("/Users/michael/Dropbox/_BachelorThesis/results/WebSQL_vs_SQLitePlugin/WebSQL_vs_SQLitePlugin.png", width = 1000, height = 480)
par(mfrow=c(1, 3))

plot(Nexus7_sqlite, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden", main="Android")
lines(Nexus7_websql, ylim=c(0, 7000), col="blue")

plot(IOS_sqlite, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden", main="iOS")
lines(IOS_websql, ylim=c(0, 7000), col="blue")
legend(10,6000, c("SQLite Plugin","WebSQL"), lty=c(1,1), lwd=c(2.5,2.5),col=c("blue","red"))

plot(WP8_sqlite, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden", main="Windows Phone 8")
lines(WP8_websql, ylim=c(0, 7000), col="blue")
dev.off();


par(mfrow=c(1, 1))