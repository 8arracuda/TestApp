#Nexus4
LocalStorage_C1_500<-c(134,147,137,103,100,103,116,120,97,147);
FileAPI_C1_500<-c(10926,11698,9836,9191,9865,10585,9376,11322,9536,9075);
WebSQL_C1_500<-c(3,0,0,0,0,0,0,0,0,1);
WebSQL_C2_500<-c(1,0,0,7,0,1,0,0,0,1);
#placeholder values:
IndexedDB_C1_500<-c(20,60,30,70,20,60,30,10,10,20);
FileAPI_C1_500<-c(10,80,10,20,70,40,20,10,60,10);
SessionStorage_C1_500<-c(20,80,20,30,30,30,70,30,70,30);
SQLitePlugin_C1_500<-c(20,50,10,20,70,40,10,60,20,60);

Nexus4<-data.frame(LocalStorage_C1_500,WebSQL_C1_500, IndexedDB_C1_500,FileAPI_C1_500,SessionStorage_C1_500,SQLitePlugin_C1_500);
colnames(Nexus4) <- c("LocalStorage_C1_500", "WebSQL_C1_500", "IndexedDB_C1_500", "FileAPI_C1_500","SessionStoage_C1_500","SQLitePlugin_C1_500");
#Nexus4<-data.frame(LocalStorage_C1_500, FileAPI_C1_500, WebSQL_C1_500, WebSQL_C2_500)

WebSQL_C1_500_IOS8Sim<-c(0,0,0,1,0,0,0,0,0,0);
WebSQL_C2_500_IOS8Sim<-c(0,0,0,0,0,0,0,8,0,0);
LocalStorage_C1_500_IOS8Sim<-c(3,3,3,3,3,3,3,2,2,2);
FileAPI_C1_500_IOS8Sim<-c(1050, 994, 879,1159,942, 1062, 859,923, 950, 953);

#ChromeMacbook
IndexedDB_U1_500<-c(48,48,49,59,50,50,47,48,51,49);
IndexedDB_C1_500<-c(196,178,172,166,176,171,187,201,171,167);
IndexedDB_C2_500<-c(518,433,396,486,493,489,474,479,431,515);
LocalStorage_C1_500<-c(13,12,9,12,12,12,13,10,13,13);
LocalStorage_C2_500<-c(173,167,153,152,163,161,156,152,166,160);
WebSQL_C1_500<-c(0,0,0,0,0,0,0,0,0,0);
#placeholder values:
IndexedDB_C1_500<-c(10,20,30,40,30,40,30,20,30,40);
FileAPI_C1_500<-c(20,10,30,50,80,40,20,10,70,20);
SessionStorage_C1_500<-c(80,80,70,50,50,50,40,30,30,30);
SQLitePlugin_C1_500<-c(10,40,40,40,70,70,70,70,10,30);

ChromeMacbook<-data.frame(LocalStorage_C1_500,WebSQL_C1_500, IndexedDB_C1_500,FileAPI_C1_500,SessionStorage_C1_500,SQLitePlugin_C1_500);
colnames(ChromeMacbook) <- c("LocalStorage C1_500", "WebSQL C1_500", "IndexedDB C1_500", "FileAPI C1_500","SessionStorage C1_500","SQLitePlugin C1_500");



par(mar=c(8,15,4,4));
boxplot(ChromeMacbook,main="Chrome on Macbook", las=2, xlab='ms', horizontal = TRUE);
boxplot(Nexus4,main="Nexus 4", las=2, xlab='ms', horizontal = TRUE);

#boxplot(Nexus4[LocalStorage_C1_500,1], ChromeMacbook[LocalStorage_C1_500,1]);
#boxplot(Nexus4[LocalStorage_C1_500,], ChromeMacbook[LocalStorage_C1_500,]);
#boxplot(Nexus4,las=2, xlab='ms', horizontal = TRUE);

#boxplot(LocalStorage_C1_500, FileAPI_C1_500, WebSQL_C1_500_Nexus4);

#boxplot(LocalStorage_C1_500, FileAPI_C1_500, WebSQL_C1_500_Nexus4);
#boxplot(FileAPI_C1_500_IOS8Sim, FileAPI_C1_500_Nexus4);





Platform Tests:

#PL_WebSQL
#Opening the database with 1*1024*1024
#$scope.db = window.openDatabase(dbName, dbVersion, dbName, 1 * 1024 * 1024);
#IOS8SIM - LimitTest1: Crash at 13.800.000









plot(type='l', lty=2, Lumia620$LocalStorage_C1_500, ylim=c(0,1000))
lines(IOSSim$LocalStorage_C1_500, lyt=3)
lines(Nexus4$LocalStorage_C1_500, lyt=4)
title(main="Autos", col.main="red", font.main=4)





IOSSim_means <- lapply(IOSSim, mean)
Nexus4_means <- lapply(Nexus4, mean)
Nexus7_means <- lapply(Nexus7, mean)
Lumia620_means <- lapply(Lumia620, mean)


df<-data.frame(sapply(Nexus7, mean), sapply(IOSSim, mean), sapply(Lumia620, mean));
colnames(df) <- c("Nexus7", "IOSSim", "Lumia620");


#machen das gleiche
#df[1,]
#df["LocalStorage_C1_500",]

#machen das gleiche
#df[,"Nexus4"]
#df[,1]


IOSSim_lapply <- lapply(IOSSim, mean)
Nexus4_lapply <- lapply(Nexus4, mean)
Lumia620_lapply <- lapply(Lumia620, mean)



values <-c(Nexus4_lapply$LocalStorage_C1_500, IOSSim_lapply$LocalStorage_C1_500, Lumia620_lapply$LocalStorage_C1_500)
barplot(values, cex.names=0.9, las=1, horiz=TRUE, xlab='ms', xlim = c(0,1500), names.arg=c("Nexus 4", "Lumia 620", "IOSSIM"))


#Testdata
LocalStorage_C1_500<-c(145.5, 829.1, 3.6)
LocalStorage_C1_2000<-c(493.0, 3505.1, 12)
LocalStorage_C2_500<-c(600, 200, 100)
LocalStorage_C2_2000<-c(1400, 400, 200)

barplot(LocalStorage_C2_2000, cex.names=0.9, las=1, horiz=TRUE, xlab='ms', xlim = c(0,1500), names.arg=c("Nexus 4", "Lumia 620", "IOSSIM"))


LS_C1_500 <-c(Nexus4_lapply$LocalStorage_C1_500, IOSSim_lapply$LocalStorage_C1_500, Lumia620_lapply$LocalStorage_C1_500)
barplot(LS_C1_500, cex.names=0.9, las=1, horiz=TRUE, xlab='ms', xlim = c(0,1500), names.arg=c("Android", "iOS", "Windows Phone"))

LS_C1_2000 <-c(Nexus4_lapply$LocalStorage_C1_2000, IOSSim_lapply$LocalStorage_C1_2000, Lumia620_lapply$LocalStorage_C1_2000)
barplot(LS_C1_2000, cex.names=0.9, las=1, horiz=TRUE, xlab='ms', xlim = c(0,1500), names.arg=c("Android", "iOS", "Windows Phone"))







IOSSim_means <- lapply(IOSSim, mean)
Nexus4_means <- lapply(Nexus4, mean)
Nexus7_means <- lapply(Nexus7, mean)
Lumia620_means <- lapply(Lumia620, mean)

#par(mfrow=c(2,1))
#par(mar = rep(2, 4))

#draws 3 graphs
colors=c("darkblue","red", "green", "cyan");
upperLimit=40000;
par(mfrow=c(3,1));
Nexus4_LS_C1C2 <-c(Nexus4_lapply$LocalStorage_C1_500, Nexus4_lapply$LocalStorage_C1_2000, Nexus4_lapply$LocalStorage_C2_500, Nexus4_lapply$LocalStorage_C2_2000);
barplot(Nexus4_LS_C1C2, cex.names=0.9, las=1, horiz=TRUE, col=colors, xlab='ms', xlim = c(0,upperLimit))
title(main="Nexus 4", font.main=4)

Lumia620_LS_C1C2 <-c(Lumia620_lapply$LocalStorage_C1_500, Lumia620_lapply$LocalStorage_C1_2000, Lumia620_lapply$LocalStorage_C2_500, Lumia620_lapply$LocalStorage_C2_2000);
barplot(Lumia620_LS_C1C2, cex.names=0.9, las=1, horiz=TRUE, col=colors, xlab='ms', xlim = c(0,upperLimit))
title(main="Lumia 620", font.main=4)

IOSSim_LS_C1C2 <-c(IOSSim_lapply$LocalStorage_C1_500, IOSSim_lapply$LocalStorage_C1_2000, IOSSim_lapply$LocalStorage_C2_500, IOSSim_lapply$LocalStorage_C2_2000);
barplot(IOSSim_LS_C1C2, cex.names=0.9, las=1, horiz=TRUE, , col=colors, xlab='ms', xlim = c(0,upperLimit))
title(main="iOS Simulator", font.main=4)

legend("topright",
       legend = c("C1-500", "C1-2000", "C2-500", "C2-2000"),
       fill = colors)




LS_C1_500<-c(Nexus4_means$LocalStorage_C1_500, IOSSim_means$LocalStorage_C1_500, Lumia620_means$LocalStorage_C1_500);
LS_C1_2000<-c(Nexus4_means$LocalStorage_C1_2000, IOSSim_means$LocalStorage_C1_2000, Lumia620_means$LocalStorage_C1_2000);
LS_C2_500<-c(Nexus4_means$LocalStorage_C2_500, IOSSim_means$LocalStorage_C2_500, Lumia620_means$LocalStorage_C2_500);
LS_C2_2000<-c(Nexus4_means$LocalStorage_C2_2000, IOSSim_means$LocalStorage_C2_2000, Lumia620_means$LocalStorage_C2_2000);
LS_C3_6<-c(Nexus4_means$LocalStorage_C3_6, IOSSim_means$LocalStorage_C3_6, Lumia620_means$LocalStorage_C3_6);
LS_R1_500<-c(Nexus4_means$LocalStorage_R1_500, IOSSim_means$LocalStorage_R1_500, Lumia620_means$LocalStorage_R1_500);
LS_R1_2000<-c(Nexus4_means$LocalStorage_R1_2000, IOSSim_means$LocalStorage_R1_2000, Lumia620_means$LocalStorage_R1_2000);
LS_R2_500<-c(Nexus4_means$LocalStorage_R2_500, IOSSim_means$LocalStorage_R2_500, Lumia620_means$LocalStorage_R2_500);
LS_R2_2000<-c(Nexus4_means$LocalStorage_R2_2000, IOSSim_means$LocalStorage_R2_2000, Lumia620_means$LocalStorage_R2_2000);
LS_R3_6<-c(Nexus4_means$LocalStorage_R3_6, IOSSim_means$LocalStorage_R3_6, Lumia620_means$LocalStorage_R3_6);
LS_U1_500<-c(Nexus4_means$LocalStorage_U1_500, IOSSim_means$LocalStorage_U1_500, Lumia620_means$LocalStorage_U1_500);
LS_U1_2000<-c(Nexus4_means$LocalStorage_U1_2000, IOSSim_means$LocalStorage_U1_2000, Lumia620_means$LocalStorage_U1_2000);
LS_D1_500<-c(Nexus4_means$LocalStorage_D1_500, IOSSim_means$LocalStorage_D1_500, Lumia620_means$LocalStorage_D1_500);
LS_D1_2000<-c(Nexus4_means$LocalStorage_D1_2000, IOSSim_means$LocalStorage_D1_2000, Lumia620_means$LocalStorage_D1_2000);

SS_C1_500<-c(Nexus4_means$SessionStorage_C1_500, IOSSim_means$SessionStorage_C1_500, Lumia620_means$SessionStorage_C1_500);
SS_C1_2000<-c(Nexus4_means$SessionStorage_C1_2000, IOSSim_means$SessionStorage_C1_2000, Lumia620_means$SessionStorage_C1_2000);
SS_C2_500<-c(Nexus4_means$SessionStorage_C2_500, IOSSim_means$SessionStorage_C2_500, Lumia620_means$SessionStorage_C2_500);
SS_C2_2000<-c(Nexus4_means$SessionStorage_C2_2000, IOSSim_means$SessionStorage_C2_2000, Lumia620_means$SessionStorage_C2_2000);
SS_C3_6<-c(Nexus4_means$SessionStorage_C3_6, IOSSim_means$SessionStorage_C3_6, Lumia620_means$SessionStorage_C3_6);
SS_R1_500<-c(Nexus4_means$SessionStorage_R1_500, IOSSim_means$SessionStorage_R1_500, Lumia620_means$SessionStorage_R1_500);
SS_R1_2000<-c(Nexus4_means$SessionStorage_R1_2000, IOSSim_means$SessionStorage_R1_2000, Lumia620_means$SessionStorage_R1_2000);
SS_R2_500<-c(Nexus4_means$SessionStorage_R2_500, IOSSim_means$SessionStorage_R2_500, Lumia620_means$SessionStorage_R2_500);
SS_R2_2000<-c(Nexus4_means$SessionStorage_R2_2000, IOSSim_means$SessionStorage_R2_2000, Lumia620_means$SessionStorage_R2_2000);
SS_R3_6<-c(Nexus4_means$SessionStorage_R3_6, IOSSim_means$SessionStorage_R3_6, Lumia620_means$SessionStorage_R3_6);
SS_U1_500<-c(Nexus4_means$SessionStorage_U1_500, IOSSim_means$SessionStorage_U1_500, Lumia620_means$SessionStorage_U1_500);
SS_U1_2000<-c(Nexus4_means$SessionStorage_U1_2000, IOSSim_means$SessionStorage_U1_2000, Lumia620_means$SessionStorage_U1_2000);
SS_D1_500<-c(Nexus4_means$SessionStorage_D1_500, IOSSim_means$SessionStorage_D1_500, Lumia620_means$SessionStorage_D1_500);
SS_D1_2000<-c(Nexus4_means$SessionStorage_D1_2000, IOSSim_means$SessionStorage_D1_2000, Lumia620_means$SessionStorage_D1_2000);

LS_C1<-c(LS_C1_500, LS_C1_2000);
SS_C1<-c(SS_C1_500, SS_C1_2000);

par(mfrow=c(2,1));
barplot(LS_C1, horiz=TRUE, xlim=c(0,3500))
title(main="LocalStorage C1", font.main=4)
barplot(SS_C1, horiz=TRUE, xlim=c(0,3500))
title(main="SessionStorage C1", font.main=4)