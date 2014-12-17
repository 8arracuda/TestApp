for (i in seq(0,5) ) {

if(i==1) {
  tmp = meansDf[seq(1,16),];
  title<-"Fehlende Testergebnisse - LocalStorage"
  filenameSuffix<-"LocalStorage"
}

if(i==2) {
  tmp = meansDf[seq(33,48),];
  title<-"Fehlende Testergebnisse - IndexedDB"
  filenameSuffix<-"IndexedDB"
}

if(i==3) {
  tmp = meansDf[seq(49,64),];
  title<-"Fehlende Testergebnisse - Web SQL"
  filenameSuffix<-"WebSQL"
}

if(i==4) {
  tmp = meansDf[seq(65,80),];
  title<-"Fehlende Testergebnisse - SQLite Plugin"
  filenameSuffix<-"SQLitePlugin"
}

if(i==5) {
  tmp = meansDf[seq(81,96),];
  title<-"Fehlende Testergebnisse - File Plugin"
  filenameSuffix<-"FilePlugin"
}

colnames(tmp)<-c("iOS", "WP8", "Android")
longData <- melt(as.matrix(tmp))

myPalette <- colorRampPalette(c("white","white"))
zp1 <- ggplot(longData,aes(x = Var2, y = Var1, fill = value))

zp1 <- zp1 + geom_tile()
zp1 <- zp1 + scale_fill_gradientn(colours = myPalette(100), na.value = "darkgrey")
zp1 <- zp1 + scale_x_discrete(expand = c(0, 0))
zp1 <- zp1 + scale_y_discrete(expand = c(0, 0))
zp1 <- zp1 + coord_equal()
zp1 <- zp1 + theme_bw()
zp1 <- zp1 + theme(legend.position="none")
zp1 <- zp1 +  theme(axis.text.x = element_text(angle = 90, hjust = 1))
zp1 <- zp1 + labs(title=title)

print(zp1)

ggsave(file=paste("/Users/michael/Dropbox/_BachelorThesis/results/MissingResults/missingResults_",filenameSuffix,".png"));

}