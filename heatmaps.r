#doInstall <- TRUE  # Change to FALSE if you don't want packages installed.
#toInstall <- c("ggplot2", "reshape2", "RColorBrewer")
#if(doInstall){install.packages(toInstall, repos = "http://cran.us.r-project.org")}
#lapply(toInstall, library, character.only = TRUE)

#longData <-melt(as.matrix(sapply(Nexus7, mean)))


#IOSSIM
tmp_LS_means<-as.matrix(sapply(IOSSim, mean))[seq(1,16)]
tmp_IDB_means<-as.matrix(sapply(IOSSim, mean))[seq(33,48)]
tmp_WSQL_means<-as.matrix(sapply(IOSSim, mean))[seq(49,64)]
tmp_SQLite_means<-as.matrix(sapply(IOSSim, mean))[seq(65,80)]
tmp_File_means<-as.matrix(sapply(IOSSim, mean))[seq(81,96)]

tmp_df <- data.frame(tmp_LS_means, tmp_IDB_means, tmp_WSQL_means, tmp_WSQL_means, tmp_File_means)
rownames(tmp_df)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "C3-24", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "R3-24", "U1-500", "U1-2000", "D1-500", "D1-2000");
matrix_IOSSIM_means = as.matrix(tmp_df)  

#Lumia 620
tmp_LS_means<-as.matrix(sapply(Lumia620, mean))[seq(1,16)]
tmp_IDB_means<-as.matrix(sapply(Lumia620, mean))[seq(33,48)]
tmp_WSQL_means<-as.matrix(sapply(Lumia620, mean))[seq(49,64)]
tmp_SQLite_means<-as.matrix(sapply(Lumia620, mean))[seq(65,80)]
tmp_File_means<-as.matrix(sapply(Lumia620, mean))[seq(81,96)]

tmp_df <- data.frame(tmp_LS_means, tmp_IDB_means, tmp_WSQL_means, tmp_WSQL_means, tmp_File_means)
rownames(tmp_df)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "C3-24", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "R3-24", "U1-500", "U1-2000", "D1-500", "D1-2000");
matrix_Lumia620_means = as.matrix(tmp_df)            

#Nexus 7
tmp_LS_means<-as.matrix(sapply(Nexus7, mean))[seq(1,16)]
tmp_IDB_means<-as.matrix(sapply(Nexus7, mean))[seq(33,48)]
tmp_WSQL_means<-as.matrix(sapply(Nexus7, mean))[seq(49,64)]
tmp_SQLite_means<-as.matrix(sapply(Nexus7, mean))[seq(65,80)]
tmp_File_means<-as.matrix(sapply(Nexus7, mean))[seq(81,96)]

tmp_df <- data.frame(tmp_LS_means, tmp_IDB_means, tmp_WSQL_means, tmp_WSQL_means, tmp_File_means)
rownames(tmp_df)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "C3-24", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "R3-24", "U1-500", "U1-2000", "D1-500", "D1-2000");
matrix_Nexus7_means = as.matrix(tmp_df)            

for (i in seq(1,3) ) {
 if (i==1) {
   longData <- melt(matrix_Nexus7_means)
 }
 if (i==2) {
   longData <- melt(matrix_IOSSIM_means)
 }
 if (i==3) {
   longData <- melt(matrix_Lumia620_means)
 }
 
 myPalette <- colorRampPalette(rev(brewer.pal(11, "Spectral")), space="Lab")
 zp1 <- ggplot(longData,aes(x = Var2, y = Var1, fill = value))
 
 
 
 zp1 <- zp1 + geom_tile()
 zp1 <- zp1 + scale_fill_gradientn(colours = myPalette(100))
 zp1 <- zp1 + scale_x_discrete(expand = c(0, 0))
 zp1 <- zp1 + scale_y_discrete(expand = c(0, 0))
 zp1 <- zp1 + coord_equal()
 zp1 <- zp1 + theme_bw()
 zp1 <- zp1 + theme_grey(base_size = base_size) + labs(x = "",
+ y = "") + scale_x_discrete(expand = c(0, 0)) +
+ scale_y_discrete(expand = c(0, 0)) + opts(legend.position = "none",
+ axis.ticks = theme_blank(), axis.text.x = theme_text(size = base_size *
                                                                                                                +         0.8, angle = 330, hjust = 0, colour = "grey50"))
                                                                                                                +         0.8, angle = 330, hjust = 0, colour = "grey50"))
 print(zp1) 
 
 ggsave(file=paste("/Users/michael/Downloads/results/heatmap_",i,".png", sep=""))
}



