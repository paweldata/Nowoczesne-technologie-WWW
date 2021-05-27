<footer id="contact">
  <h2>Dane kontaktowe</h2>
  <table class="contact_table">
    <tr>
      <td>Imię i nazwisko:</td>
      <td>Paweł Data</td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>123pawel99@gmail.com</td>
    </tr>
    <tr>
      <td>Telefon:</td>
      <td>1234567890</td>
    </tr>
  </table>
  <h4> Ilość wizyt : <?php echo (isset($counterUpdater))?$counterUpdater->getCounter():'0'; ?></h4>
</footer>
