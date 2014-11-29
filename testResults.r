#Nexus4
LocalStorage_C1_500<-c(134,147,137,103,100,103,116,120,97,147);
FileAPI_C1_500<-c(10926,11698,9836,9191,9865,10585,9376,11322,9536,9075);
WebSQL_C1_500<-c(3,0,0,0,0,0,0,0,0,1);
WebSQL_C2_500<-c(1,0,0,7,0,1,0,0,0,1);
Nexus4<-data.frame(LocalStorage_C1_500);
colnames(Nexus4) <- c("LocalStorage C1 500");
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

ChromeMacbook<-data.frame(LocalStorage_C1_500);
colnames(ChromeMacbook) <- c("LocalStorage C1 500");

boxplot(Nexus4[LocalStorage_C1_500,1], ChromeMacbook[LocalStorage_C1_500,1]);