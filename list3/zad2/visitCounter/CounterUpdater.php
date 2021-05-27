<?php

$counterUpdater = new CounterUpdater();
$counterUpdater->update();

class CounterUpdater {
    const IP_LIST_FILE = "visitCounter/ipList.txt";
    const VISIT_COUNTER_FILE = "visitCounter/visitCounter.txt";
    const DATE_FORMAT = "Y-m-d";
    private int $counter;

    function __construct() {
        $this->setCounterFromFile();
    }

    private function setCounterFromFile() {
        $file = fopen(self::VISIT_COUNTER_FILE, "r");

        if ($file) {
            $this->counter = (int)fread($file, 20);
            fclose($file);
        } else {
            $this->counter = 0;
        }
    }

    function getCounter(): int { return $this->counter; }

    function update() {
        $ip = $this->getClientIp();
        if ($this->isNewIpToday($ip)) {
            $this->writeNewIdToFile($ip);
            $this->updateCounter();
        }
    }

    private function getClientIp() {
        return getenv('HTTP_CLIENT_IP')?:
            getenv('HTTP_X_FORWARDED_FOR')?:
                getenv('HTTP_X_FORWARDED')?:
                    getenv('HTTP_FORWARDED_FOR')?:
                        getenv('HTTP_FORWARDED')?:
                            getenv('REMOTE_ADDR');
    }

    private function isNewIpToday($ip): bool {
        $ipsFile = $this->openIpListFile();

        if ($this->isNewDayToday($ipsFile))
            $ipsFile = $this->clearIpListFileAndSetNewDate();

        while (($line = fgets($ipsFile)) !== false)
            if ($line === $ip)
                return false;

        return true;
    }

    private function openIpListFile() {
        $ipsFile = fopen(self::IP_LIST_FILE, "r");
        if (!$ipsFile)
            $ipsFile = fopen(self::IP_LIST_FILE, "w+");
        return $ipsFile;
    }

    private function isNewDayToday($ipsFile): bool {
        return substr(fgets($ipsFile), 0, -1) !== date(self::DATE_FORMAT);
    }

    private function clearIpListFileAndSetNewDate() {
        $ipsFile = fopen(self::IP_LIST_FILE, "w+");
        fwrite($ipsFile, date(self::DATE_FORMAT));
        return $ipsFile;
    }

    private function writeNewIdToFile($ip) {
        $ipsFile = fopen(self::IP_LIST_FILE, "a");
        fwrite($ipsFile,"\n");
        fwrite($ipsFile,$ip);
    }

    private function updateCounter() {
        $this->counter++;
        $file = fopen(self::VISIT_COUNTER_FILE, "w");
        fwrite($file, $this->counter);
        fclose ($file);
    }
}
