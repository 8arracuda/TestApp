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

rows_LS<-rownames(meansDf)[seq(1,14)] #LocalStorage
rows_SS<-rownames(meansDf)[seq(15,28)] #SessionStorage
rows_IDB<-rownames(meansDf)[seq(29,44)] #IndexedDB
rows_WSQL<-rownames(meansDf)[seq(45,60)] #WebSQL
rows-SQLite<-rownames(meansDf)[seq(61,76)] #SQLitePlugin
rows_File<-rownames(meansDf)[seq(77,92)] #File API



df_LocalStorage<-meansDf[rows_LS, ]
row.names(df_SessionStorage)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "U1-500", "U1-2000", "D1-500", "D1-2000")

df_SessionStorage<-meansDf[rows_SS, ]
row.names(df_SessionStorage)<-c("C1-500", "C1-2000", "C2-500", "C2-2000", "C3-6", "R1-500", "R1-2000", "R2-500", "R2-2000", "R3-6", "U1-500", "U1-2000", "D1-500", "D1-2000")

barplot(as.matrix(df_LocalStorage), beside=T, horiz=T, legend=T, main="LocalStorage")

#Zugriff über
meansDf[rows_LS, ]



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

FILE_C1_500<-c(Nexus4_means$FileAPI_C1_500, IOSSim_means$FileAPI_C1_500, Lumia620_means$FileAPI_C1_500);
FILE_C1_2000<-c(Nexus4_means$FileAPI_C1_2000, IOSSim_means$FileAPI_C1_2000, Lumia620_means$FileAPI_C1_2000);
FILE_C2_500<-c(Nexus4_means$FileAPI_C2_500, IOSSim_means$FileAPI_C2_500, Lumia620_means$FileAPI_C2_500);
FILE_C2_2000<-c(Nexus4_means$FileAPI_C2_2000, IOSSim_means$FileAPI_C2_2000, Lumia620_means$FileAPI_C2_2000);
FILE_C3_6<-c(Nexus4_means$FileAPI_C3_6, IOSSim_means$FileAPI_C3_6, Lumia620_means$FileAPI_C3_6);
FILE_R1_500<-c(Nexus4_means$FileAPI_R1_500, IOSSim_means$FileAPI_R1_500, Lumia620_means$FileAPI_R1_500);
FILE_R1_2000<-c(Nexus4_means$FileAPI_R1_2000, IOSSim_means$FileAPI_R1_2000, Lumia620_means$FileAPI_R1_2000);
FILE_R2_500<-c(Nexus4_means$FileAPI_R2_500, IOSSim_means$FileAPI_R2_500, Lumia620_means$FileAPI_R2_500);
FILE_R2_2000<-c(Nexus4_means$FileAPI_R2_2000, IOSSim_means$FileAPI_R2_2000, Lumia620_means$FileAPI_R2_2000);
FILE_R3_6<-c(Nexus4_means$FileAPI_R3_6, IOSSim_means$FileAPI_R3_6, Lumia620_means$FileAPI_R3_6);
FILE_U1_500<-c(Nexus4_means$FileAPI_U1_500, IOSSim_means$FileAPI_U1_500, Lumia620_means$FileAPI_U1_500);
FILE_U1_2000<-c(Nexus4_means$FileAPI_U1_2000, IOSSim_means$FileAPI_U1_2000, Lumia620_means$FileAPI_U1_2000);
FILE_D1_500<-c(Nexus4_means$FileAPI_D1_500, IOSSim_means$FileAPI_D1_500, Lumia620_means$FileAPI_D1_500);
FILE_D1_2000<-c(Nexus4_means$FileAPI_D1_2000, IOSSim_means$FileAPI_D1_2000, Lumia620_means$FileAPI_D1_2000);

WSQL_C1_500<-c(Nexus4_means$WebSQL_C1_500, IOSSim_means$WebSQL_C1_500, Lumia620_means$WebSQL_C1_500);
WSQL_C1_2000<-c(Nexus4_means$WebSQL_C1_2000, IOSSim_means$WebSQL_C1_2000, Lumia620_means$WebSQL_C1_2000);
WSQL_C2_500<-c(Nexus4_means$WebSQL_C2_500, IOSSim_means$WebSQL_C2_500, Lumia620_means$WebSQL_C2_500);
WSQL_C2_2000<-c(Nexus4_means$WebSQL_C2_2000, IOSSim_means$WebSQL_C2_2000, Lumia620_means$WebSQL_C2_2000);
WSQL_C3_6<-c(Nexus4_means$WebSQL_C3_6, IOSSim_means$WebSQL_C3_6, Lumia620_means$WebSQL_C3_6);
WSQL_R1_500<-c(Nexus4_means$WebSQL_R1_500, IOSSim_means$WebSQL_R1_500, Lumia620_means$WebSQL_R1_500);
WSQL_R1_2000<-c(Nexus4_means$WebSQL_R1_2000, IOSSim_means$WebSQL_R1_2000, Lumia620_means$WebSQL_R1_2000);
WSQL_R2_500<-c(Nexus4_means$WebSQL_R2_500, IOSSim_means$WebSQL_R2_500, Lumia620_means$WebSQL_R2_500);
WSQL_R2_2000<-c(Nexus4_means$WebSQL_R2_2000, IOSSim_means$WebSQL_R2_2000, Lumia620_means$WebSQL_R2_2000);
WSQL_R3_6<-c(Nexus4_means$WebSQL_R3_6, IOSSim_means$WebSQL_R3_6, Lumia620_means$WebSQL_R3_6);
WSQL_U1_500<-c(Nexus4_means$WebSQL_U1_500, IOSSim_means$WebSQL_U1_500, Lumia620_means$WebSQL_U1_500);
WSQL_U1_2000<-c(Nexus4_means$WebSQL_U1_2000, IOSSim_means$WebSQL_U1_2000, Lumia620_means$WebSQL_U1_2000);
WSQL_D1_500<-c(Nexus4_means$WebSQL_D1_500, IOSSim_means$WebSQL_D1_500, Lumia620_means$WebSQL_D1_500);
WSQL_D1_2000<-c(Nexus4_means$WebSQL_D1_2000, IOSSim_means$WebSQL_D1_2000, Lumia620_means$WebSQL_D1_2000);

SQLite_C1_500<-c(Nexus4_means$SQLitePlugin__C1_500, IOSSim_means$SQLitePlugin__C1_500, Lumia620_means$SQLitePlugin__C1_500);
SQLite_C1_2000<-c(Nexus4_means$SQLitePlugin__C1_2000, IOSSim_means$SQLitePlugin__C1_2000, Lumia620_means$SQLitePlugin__C1_2000);
SQLite_C2_500<-c(Nexus4_means$SQLitePlugin__C2_500, IOSSim_means$SQLitePlugin__C2_500, Lumia620_means$SQLitePlugin__C2_500);
SQLite_C2_2000<-c(Nexus4_means$SQLitePlugin__C2_2000, IOSSim_means$SQLitePlugin__C2_2000, Lumia620_means$SQLitePlugin__C2_2000);
SQLite_C3_6<-c(Nexus4_means$SQLitePlugin__C3_6, IOSSim_means$SQLitePlugin__C3_6, Lumia620_means$SQLitePlugin__C3_6);
SQLite_R1_500<-c(Nexus4_means$SQLitePlugin__R1_500, IOSSim_means$SQLitePlugin__R1_500, Lumia620_means$SQLitePlugin__R1_500);
SQLite_R1_2000<-c(Nexus4_means$SQLitePlugin__R1_2000, IOSSim_means$SQLitePlugin__R1_2000, Lumia620_means$SQLitePlugin__R1_2000);
SQLite_R2_500<-c(Nexus4_means$SQLitePlugin__R2_500, IOSSim_means$SQLitePlugin__R2_500, Lumia620_means$SQLitePlugin__R2_500);
SQLite_R2_2000<-c(Nexus4_means$SQLitePlugin__R2_2000, IOSSim_means$SQLitePlugin__R2_2000, Lumia620_means$SQLitePlugin__R2_2000);
SQLite_R3_6<-c(Nexus4_means$SQLitePlugin__R3_6, IOSSim_means$SQLitePlugin__R3_6, Lumia620_means$SQLitePlugin__R3_6);
SQLite_U1_500<-c(Nexus4_means$SQLitePlugin__U1_500, IOSSim_means$SQLitePlugin__U1_500, Lumia620_means$SQLitePlugin__U1_500);
SQLite_U1_2000<-c(Nexus4_means$SQLitePlugin__U1_2000, IOSSim_means$SQLitePlugin__U1_2000, Lumia620_means$SQLitePlugin__U1_2000);
SQLite_D1_500<-c(Nexus4_means$SQLitePlugin__D1_500, IOSSim_means$SQLitePlugin__D1_500, Lumia620_means$SQLitePlugin__D1_500);
SQLite_D1_2000<-c(Nexus4_means$SQLitePlugin__D1_2000, IOSSim_means$SQLitePlugin__D1_2000, Lumia620_means$SQLitePlugin__D1_2000);

IDB_C1_500<-c(Nexus4_means$IndexedDB_C1_500, IOSSim_means$IndexedDB_C1_500, Lumia620_means$IndexedDB_C1_500);
IDB_C1_2000<-c(Nexus4_means$IndexedDB_C1_2000, IOSSim_means$IndexedDB_C1_2000, Lumia620_means$IndexedDB_C1_2000);
IDB_C2_500<-c(Nexus4_means$IndexedDB_C2_500, IOSSim_means$IndexedDB_C2_500, Lumia620_means$IndexedDB_C2_500);
IDB_C2_2000<-c(Nexus4_means$IndexedDB_C2_2000, IOSSim_means$IndexedDB_C2_2000, Lumia620_means$IndexedDB_C2_2000);
IDB_C3_6<-c(Nexus4_means$IndexedDB_C3_6, IOSSim_means$IndexedDB_C3_6, Lumia620_means$IndexedDB_C3_6);
IDB_R1_500<-c(Nexus4_means$IndexedDB_R1_500, IOSSim_means$IndexedDB_R1_500, Lumia620_means$IndexedDB_R1_500);
IDB_R1_2000<-c(Nexus4_means$IndexedDB_R1_2000, IOSSim_means$IndexedDB_R1_2000, Lumia620_means$IndexedDB_R1_2000);
IDB_R2_500<-c(Nexus4_means$IndexedDB_R2_500, IOSSim_means$IndexedDB_R2_500, Lumia620_means$IndexedDB_R2_500);
IDB_R2_2000<-c(Nexus4_means$IndexedDB_R2_2000, IOSSim_means$IndexedDB_R2_2000, Lumia620_means$IndexedDB_R2_2000);
IDB_R3_6<-c(Nexus4_means$IndexedDB_R3_6, IOSSim_means$IndexedDB_R3_6, Lumia620_means$IndexedDB_R3_6);
IDB_U1_500<-c(Nexus4_means$IndexedDB_U1_500, IOSSim_means$IndexedDB_U1_500, Lumia620_means$IndexedDB_U1_500);
IDB_U1_2000<-c(Nexus4_means$IndexedDB_U1_2000, IOSSim_means$IndexedDB_U1_2000, Lumia620_means$IndexedDB_U1_2000);
IDB_D1_500<-c(Nexus4_means$IndexedDB_D1_500, IOSSim_means$IndexedDB_D1_500, Lumia620_means$IndexedDB_D1_500);
IDB_D1_2000<-c(Nexus4_means$IndexedDB_D1_2000, IOSSim_means$IndexedDB_D1_2000, Lumia620_means$IndexedDB_D1_2000);




LS_C1<-c(LS_C1_500, LS_C1_2000);
SS_C1<-c(SS_C1_500, SS_C1_2000);

par(mfrow=c(2,1));
barplot(LS_C1, horiz=TRUE, xlim=c(0,3500))
title(main="LocalStorage C1", font.main=4)
barplot(SS_C1, horiz=TRUE, xlim=c(0,3500))
title(main="SessionStorage C1", font.main=4)




fooDf = data.frame(LS_C1_500, SS_C1_500)
row.names(fooDf)<-c("Android", "iOS", "WP8");
barplot(fooDf$LS_C1_500, horiz=TRUE)
barplot(t(as.matrix(fooDf)), beside=TRUE)




meansDf = data.frame(sapply(IOSSim, mean), sapply(Lumia620, mean), sapply(Nexus7, mean))
colnames(meansDf)<- c('IOSSim', 'Lumia620', 'Nexus7')

barplot(t(as.matrix(meansDf)), beside = TRUE, horiz=TRUE, cex.axis=0.01, las=3)








v2 <- rbind(IOSSim_means, Nexus4_means)
barplot(v2,beside=FALSE,legend=TRUE, horiz=TRUE)

meansDf = data.frame(IOSSim_means, Nexus7_means, Lumia620_means)



rows_LS<-rownames(meansDf)[seq(1:16)] #LocalStorage
rows_LS
rows_SS<-rownames(meansDf)[seq(17,32)] #SessionStorage
rows_SS
rows_IDB<-rownames(meansDf)[seq(33,48)] #IndexedDB
rows_IDB
rows_WSQL<-rownames(meansDf)[seq(49,64)] #WebSQL
rows_WSQL
rows_SQLite<-rownames(meansDf)[seq(65,80)] #SQLitePlugin
rows_SQLite
rows_File<-rownames(meansDf)[seq(77,96)] #File API
rows_File


factor_LS<-apply(meansDf[c(1,2),], 2, function(x) x / x[1])
factor_SS<-apply(meansDf[c(15,16),], 2, function(x) x / x[1])
factor_IDB<-apply(meansDf[c(29,30),], 2, function(x) x / x[1])

factor_haha<-apply(meansDf[c(1,2,15,16),], 2, function(x, i) x / x[i%%2], row(meansMatrix))




#Wie gut skalieren die Techniken bei der Speicherung von mehr...
factor_LS<-apply(meansDf[c(1,2),], 2, function(x) x / x[1])
factor_SS<-apply(meansDf[c(15,16),], 2, function(x) x / x[1])
factor_IDB<-apply(meansDf[c(29,30),], 2, function(x) x / x[1])
factor_WSQL<-apply(meansDf[c(45,46),], 2, function(x) x / x[1])
factor_SQLite<-apply(meansDf[c(61,62),], 2, function(x) x / x[1])
factor_File<-apply(meansDf[c(77,78),], 2, function(x) x / x[1])

height <- rbind(factor_LS, factor_SS, factor_IDB, factor_WSQL, factor_SQLite, factor_File)
mp <- barplot(height, beside = TRUE, names.arg = LETTERS[1:4])
mp <- barplot(height, beside = TRUE)
text(mp, height, labels = format(height, 1), pos = 3, cex = .75)


#Schreibt in einer Schleife Dateien
#Die Darstellten Werte entsprechen dem Unterschied zwischen dem großen und dem kleinen Test.
Die Ergebnisse sind auf das Ergebnis des kleinen Tests normalisiert- Das Ergebnis des kleinen Tests entspricht immer 1.
Wenn als Ergebnis eine 3 auftaucht, dass bedeutet das, dass der große Test 3 mal so lange gedauert hat als der kleine Test.

for (i in seq(0,14, by=2) ) {
  TestNames=c("C1","C2","C3","R1","R2","R3","U1","D1")
  factor_LS<-apply(meansDf[c(1+i,2+i),], 2, function(x) x / x[1])
  factor_LS
  factor_SS<-apply(meansDf[c(17+i,18+i),], 2, function(x) x / x[1])
  factor_SS
  factor_IDB<-apply(meansDf[c(33+i,34+i),], 2, function(x) x / x[1])
  factor_IDB
  factor_WSQL<-apply(meansDf[c(49+i,50+i),], 2, function(x) x / x[1])
  factor_WSQL
  factor_SQLite<-apply(meansDf[c(65+i,66+i),], 2, function(x) x / x[1])
  factor_SQLite
  factor_File<-apply(meansDf[c(77+i,78+i),], 2, function(x) x / x[1])
  factor_File
  png(paste("/Users/michael/Downloads/results/",i,".png", sep=""))
  height <- rbind(factor_LS[c(2),], factor_SS[c(2),], factor_IDB[c(2),], factor_WSQL[c(2),], factor_SQLite[c(2),], factor_File[c(2),])
  colors<-c("green","red", "blue", "grey", "yellow", "cyan")
  mp <- barplot(height, beside = T, col=colors, legend=F, main=TestNames[(i/2)+1])
  dev.off();
}