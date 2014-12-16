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

    png(paste("/Users/michael/Dropbox/_BachelorThesis/results/1/",platformName,"_",testName,".png", sep=""))
  barplot(main=paste(platformName,testName, sep=" "), as.matrix(tmp), horiz=T, beside = T, las=1, legend=T, col=colors, xlab='time in ms')
  
  dev.off();

  
 #tmp_merge<-merge(tmp_C1, tmp_C2, by = "row.names", all = TRUE)
#  tmp_C1
 # tmp_C2
  #barplot(totmp_merge, main=paste(platformName,testName, sep=" "), horiz=T, beside = T, las=2, legend=T, col=colors, names.arg=rownames(tmp_C1))
  

}
}