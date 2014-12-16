#C1 mit C2 und C3 vergleichen
for (i in seq(0,3) ) {
  if (i==1) {
    platformName = 'Android'
    tmp_C1 <- as.matrix(tmp_matrix_Nexus7_means[c(1,seq(33,96, by=16))])
    rownames(tmp_C1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_C2 <- as.matrix(tmp_matrix_Nexus7_means[c(3,seq(35,96, by=16))])
    rownames(tmp_C2)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_C3 <- as.matrix(tmp_matrix_Nexus7_means[c(5,seq(37,96, by=16))])
    rownames(tmp_C3)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R1 <- as.matrix(tmp_matrix_Nexus7_means[c(7,seq(39,96, by=16))])
    rownames(tmp_R1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R2 <- as.matrix(tmp_matrix_Nexus7_means[c(9,seq(41,96, by=16))])
    rownames(tmp_R2)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R3 <- as.matrix(tmp_matrix_Nexus7_means[c(11,seq(43,96, by=16))])
    rownames(tmp_R3)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_U1 <- as.matrix(tmp_matrix_Nexus7_means[c(13,seq(45,96, by=16))])
    rownames(tmp_U1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_D1 <- as.matrix(tmp_matrix_Nexus7_means[c(15,seq(47,96, by=16))])
    rownames(tmp_D1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")

  }
  if (i==2) {
    platformName = 'iOS'
    tmp_C1 <- as.matrix(tmp_matrix_IOSSIM_means[c(1,seq(33,96, by=16))])
    rownames(tmp_C1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_C2 <- as.matrix(tmp_matrix_IOSSIM_means[c(3,seq(35,96, by=16))])
    rownames(tmp_C2)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_C3 <- as.matrix(tmp_matrix_IOSSIM_means[c(5,seq(37,96, by=16))])
    rownames(tmp_C3)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R1 <- as.matrix(tmp_matrix_IOSSIM_means[c(7,seq(39,96, by=16))])
    rownames(tmp_R1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R2 <- as.matrix(tmp_matrix_IOSSIM_means[c(9,seq(41,96, by=16))])
    rownames(tmp_R2)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R3 <- as.matrix(tmp_matrix_IOSSIM_means[c(11,seq(43,96, by=16))])
    rownames(tmp_R3)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_U1 <- as.matrix(tmp_matrix_IOSSIM_means[c(13,seq(45,96, by=16))])
    rownames(tmp_U1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_D1 <- as.matrix(tmp_matrix_IOSSIM_means[c(15,seq(47,96, by=16))])
    rownames(tmp_D1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
  }
  if (i==3) {
    platformName = 'Windows Phone 8'
    tmp_C1 <- as.matrix(tmp_matrix_Lumia620_means[c(1,seq(33,96, by=16))])
    rownames(tmp_C1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_C2 <- as.matrix(tmp_matrix_Lumia620_means[c(3,seq(35,96, by=16))])
    rownames(tmp_C2)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_C3 <- as.matrix(tmp_matrix_Lumia620_means[c(5,seq(37,96, by=16))])
    rownames(tmp_C3)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R1 <- as.matrix(tmp_matrix_Lumia620_means[c(7,seq(39,96, by=16))])
    rownames(tmp_R1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R2 <- as.matrix(tmp_matrix_Lumia620_means[c(9,seq(41,96, by=16))])
    rownames(tmp_R2)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_R3 <- as.matrix(tmp_matrix_Lumia620_means[c(11,seq(43,96, by=16))])
    rownames(tmp_R3)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_U1 <- as.matrix(tmp_matrix_Lumia620_means[c(13,seq(45,96, by=16))])
    rownames(tmp_U1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
    tmp_D1 <- as.matrix(tmp_matrix_Lumia620_means[c(15,seq(47,96, by=16))])
    rownames(tmp_D1)<-c("LocalStorage", "IndexedDB", "WebSQL", "SQLite", "File Plugin")
  }



  for (testName in c("C1", "C2", "C3", "R1", "R2", "R3", "U1", "D1") ) {

    if (testName=="C1") {
      tmp = tmp_C1
    }
    if (testName=="C2") {
      tmp = tmp_C2
    }
    if (testName=="C3") {
      tmp = tmp_C3
    }
    if (testName=="R1") {
      tmp = tmp_R1
    }
    if (testName=="R2") {
      tmp = tmp_R2
    }
    if (testName=="R3") {
      tmp = tmp_R3
    }
    if (testName=="U1") {
      tmp = tmp_U1
    }
    if (testName=="D1") {
      tmp = tmp_D1
    }
  
colors<-c("red", "green", "blue", "yellow", "cyan")



imageName="C1_C2_C3"
tmp<-c(tmp_C1, tmp_C2, tmp_C3)
png(paste("/Users/michael/Dropbox/_BachelorThesis/results/2/",platformName,"_",imageName,".png", sep=""))
barplot(tmp, main=paste(platformName,imageName, sep=" "), horiz=T, beside=T, las=2, legend=T, col=colors)
dev.off()

imageName="R1_R2_R3"
tmp<-c(tmp_R1, tmp_R2, tmp_R3)
png(paste("/Users/michael/Dropbox/_BachelorThesis/results/2/",platformName,"_",imageName,".png", sep=""))
barplot(tmp, main=paste(platformName,imageName, sep=" "), horiz=T, beside=T, las=2, legend=T, col=colors)
dev.off();

imageName="U1_D1"
tmp<-c(tmp_U1, tmp_D1)
png(paste("/Users/michael/Dropbox/_BachelorThesis/results/2/",platformName,"_",imageName,".png", sep=""))
barplot(tmp, main=paste(platformName,imageName, sep=" "), horiz=T, beside=T, las=2, legend=T, col=colors)
dev.off();

#imageName="legendOnly"
#tmp<-c(tmp_R1, tmp_R2, tmp_R3)
#png(paste("/Users/michael/Dropbox/_BachelorThesis/results/2/lengendOnly.png")
#barplot(tmp, main=, horiz=T, beside=T, las=2, legend=T, col=colors)
#dev.off();

}
}