Στο παρόν directory υπάρχουν files και directories που χρησιμοποιούνται ως
πρότυπα για αντίστοιχα files που θα πρέπει να υπάρχουν στο local directory
της εφαρμογής. Σε μια νέα εγκατάσταση μπορούμε να αντιγράψουμε όλα τα files
και τα directories που υπάρχουν στο παρόν directory, στο local directory και
κατόπιν να προβούμε στις απαραίτητες διορθώσεις στα files του directory local
directory προκειμένου να αντανακλούν τη δομή και τα επιμέρους χαρακτηριστικά
της νέας εγκατάστασης.

ΠΡΟΣΟΧΗ!!!
==========
Σε καμία περίπτωση δεν θα πρέπει να τροποποιήσουμε τα files και τα directories
στο παρόν directory.

Ακολουθεί κατάλογος των αρχείων και των directories που βρίσκονται στο παρόν
directory:

sample_data (directory)
-----------------------
Στο directory "sample_data" βρίσκονται test data files που περιέχουν test
data files προκειμένου να «γεμίσουμε» τους πίνακες της database, εφόσον
πρόκειται για development system. Τα συγκεκριμένα files δεν χρειάζονται
σε production systems.

Τα test data files που περιέχονται στο "sample_data" directory είναι:

	kathigitis01.tsv
	mathima01.tsv
	mathitis01.tsv
	didaskalia01.tsv
	simetoxi01.tsv
	xristis01.tsv

secret (directory)
------------------
Στο directory secret υπάρχει file "sesami.txt" το οποιο περιέχει το password
του database account "frontistirio". Υπενθυμίζουμε ότι το εν λόγω account
έχει πλήρη DML δικαιώματα καθώς χρησιμοποιείται από τα διάφορα προγράμματα
της εφαρμογής προκειμένου να γίνει οποιαδήποτε κίνηση στην database.

conf.php (file)
---------------
Το αρχείο "conf.php" περιέχει PHP snippet με στοιχεία που διαφέρουν από
εγκατάσταση σε εγκατάσταση. Αυτά τα στοιχεία αφορούν το directory βάσης
της εφαρμογής, το βασικό url της εφαρμογής κλπ. Πρόκειται για ένα είδος
configuration file που είναι γραμμένο ως PHP snippet και εμφυτεύεται
μέσω της βιβλιοθήκης "selida.php" σε όλα τα PHP προγράμματα της εφαρμογής.

testwww.sh (file)
-----------------
Το αρχείο "testwww.sh" είναι ένα bash script το οποίο μπορεί να μας φανεί
πολύ χρήσιμο όταν κάνουμε τις δοκιμές μας στο web περιβάλλον της εφαρμογής
στο development system.
