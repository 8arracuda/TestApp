Nexus7_localStorage <- sapply(Nexus7, mean)[seq(1,16)] #websql
Nexus7_sessionStorage <- sapply(Nexus7, mean)[seq(17,32)] #sqlite plugin

IOS_localStorage <- sapply(IOSSim, mean)[seq(1,16)] #websql
IOS_sessionStorage <- sapply(IOSSim, mean)[seq(17,32)] #sqlite plugin

WP8_localStorage <- sapply(Lumia620, mean)[seq(1,16)] #websql
WP8_sessionStorage <- sapply(Lumia620, mean)[seq(17,32)] #sqlite plugin

class(Nexus7_localStorage)
axisLabels<-c("C1","C1","C2","C2","C3","C3","R1","R1","R2","R2","R3","R3","U1","U1","D1","D1")

png("/Users/michael/Dropbox/_BachelorThesis/results/LocalStorage_vs_SessionStorage/LS_vs_SS.png", width = 1000, height = 480)
par(mfrow=c(1, 3))

plot(Nexus7_localStorage,ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden", main="Android")
lines(Nexus7_sessionStorage, ylim=c(0, 7000), col="blue")

plot(IOS_localStorage, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden", main="iOS")
lines(IOS_sessionStorage, ylim=c(0, 7000), col="blue")
legend(10,6000, c("Local Storage","Session Storage"), lty=c(1,1), lwd=c(2.5,2.5),col=c("blue","red"))

plot(WP8_localStorage, ylim=c(0, 7000), type="l", col="red", cex.axis=1.5, xlab="Tests", ylab="Zeit in Millisekunden", main="Windows Phone 8")
lines(WP8_sessionStorage, ylim=c(0, 7000), col="blue")
dev.off();


par(mfrow=c(1, 1))