doInstall <- TRUE  # Change to FALSE if you don't want packages installed.
toInstall <- c("ggplot2", "reshape2", "RColorBrewer")
if(doInstall){install.packages(toInstall, repos = "http://cran.us.r-project.org")}
lapply(toInstall, library, character.only = TRUE)


x=2 # Only every 2nd Test
#x=1 # Every test


#IOSSIM
tmp_LS_means<-as.matrix(sapply(IOSSim, mean))[seq(1,16,by=x)]
tmp_IDB_means<-as.matrix(sapply(IOSSim, mean))[seq(33,48,by=x)]
tmp_WSQL_means<-as.matrix(sapply(IOSSim, mean))[seq(49,64,by=x)]
tmp_SQLite_means<-as.matrix(sapply(IOSSim, mean))[seq(65,80,by=x)]
tmp_File_means<-as.matrix(sapply(IOSSim, mean))[seq(81,96,by=x)]

tmp_df <- data.frame(tmp_LS_means, tmp_IDB_means, tmp_WSQL_means, tmp_SQLite_means, tmp_File_means)
rownames(tmp_df)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "C3-24", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "R3-24", "U1-500", "U1-2000", "D1-500", "D1-2000");
matrix_IOSSIM_means = as.matrix(tmp_df)
colnames(matrix_IOSSIM_means)<-c("LocalStorage","Indexed DB", "Web SQL", "SQLite Plugin", "File Plugin")

#Lumia 620
tmp_LS_means<-as.matrix(sapply(Lumia620, mean))[seq(1,16,by=x)]
tmp_LS_means
tmp_IDB_means<-as.matrix(sapply(Lumia620, mean))[seq(33,48,by=x)]
tmp_WSQL_means<-as.matrix(sapply(Lumia620, mean))[seq(49,64, by=x)]
tmp_SQLite_means<-as.matrix(sapply(Lumia620, mean))[seq(65,80, by=x)]
tmp_File_means<-as.matrix(sapply(Lumia620, mean))[seq(81,96, by=x)]

tmp_df <- data.frame(tmp_LS_means, tmp_IDB_means, tmp_WSQL_means, tmp_SQLite_means, tmp_File_means)
rownames(tmp_df)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "C3-24", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "R3-24", "U1-500", "U1-2000", "D1-500", "D1-2000");
matrix_Lumia620_means = as.matrix(tmp_df)
colnames(matrix_Lumia620_means)<-c("LocalStorage","Indexed DB", "Web SQL", "SQLite Plugin", "File Plugin")

#Nexus 7
tmp_LS_means<-as.matrix(sapply(Nexus7, mean))[seq(1,16, by=x)]
tmp_IDB_means<-as.matrix(sapply(Nexus7, mean))[seq(33,48, by=x)]
tmp_WSQL_means<-as.matrix(sapply(Nexus7, mean))[seq(49,64, by=x)]
tmp_SQLite_means<-as.matrix(sapply(Nexus7, mean))[seq(65,80, by=x)]
tmp_File_means<-as.matrix(sapply(Nexus7, mean))[seq(81,96, by=x)]

tmp_df <- data.frame(tmp_LS_means, tmp_IDB_means, tmp_WSQL_means, tmp_SQLite_means, tmp_File_means)

matrix_Nexus7_means = as.matrix(tmp_df)
colnames(matrix_Nexus7_means)<-c("LocalStorage","Indexed DB", "Web SQL", "SQLite Plugin", "File Plugin")

if (x==1) {
  rownames(tmp_df)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "C3-24", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "R3-24", "U1-500", "U1-2000", "D1-500", "D1-2000");
} else {
  rownames(tmp_df)<-c("C1-500", "C2-500", "C3-6", "R1-500", "R2-500", "R3-6", "U1-500", "D1-500");
}

for (i in seq(1,3) ) {
 if (i==1) {
   longData <- melt(matrix_Nexus7_means)
   platformName = 'Android'
 }
 if (i==2) {
   longData <- melt(matrix_IOSSIM_means)
   platformName = 'iOS'
 }
 if (i==3) {
   longData <- melt(matrix_Lumia620_means)
   platformName = 'Windows Phone 8'
 }
 
longData$Var1<-rep(c("C1","C2","C3","R1","R2","R3","U1","D1"),5)

# Define palette
#myPalette <- colorRampPalette(rev(brewer.pal(11, "Spectral")), space="Lab")
myPalette <- colorRampPalette(c("light green", "yellow", "orange", "red"))
zp1 <- ggplot(longData,aes(x = Var2, y = Var1, fill = value))

zp1 <- zp1 + geom_tile()
zp1 <- zp1 + scale_fill_gradientn(colours = myPalette(100), na.value = "white")
zp1 <- zp1 + scale_x_discrete(expand = c(0, 0))
zp1 <- zp1 + scale_y_discrete(expand = c(0, 0))
zp1 <- zp1 + coord_equal()
zp1 <- zp1 + theme_bw()
zp1 <- zp1 +  theme(axis.text.x = element_text(angle = 90, hjust = 1))
zp1 <- zp1 + labs(title=platformName)

print(zp1)

ggsave(file=paste("/Users/michael/Dropbox/_BachelorThesis/results/3_Heatmaps/heatmap_",i,".png", sep=""))
}



